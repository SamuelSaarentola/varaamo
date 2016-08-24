import last from 'lodash/array/last';
import rest from 'lodash/array/rest';
import filter from 'lodash/collection/filter';
import find from 'lodash/collection/find';
import forEach from 'lodash/collection/forEach';
import some from 'lodash/collection/some';
import sortBy from 'lodash/collection/sortBy';
import clone from 'lodash/lang/clone';
import isEmpty from 'lodash/lang/isEmpty';
import camelCase from 'lodash/string/camelCase';
import capitalize from 'lodash/string/capitalize';
import moment from 'moment';

import { REQUIRED_STAFF_EVENT_FIELDS } from 'constants/AppConstants';

export default {
  combineReservations,
  isStaffEvent,
  getAddress,
  getAddressWithName,
  getAvailableTime,
  getCaption,
  getDescription,
  getMainImage,
  getMissingReservationValues,
  getName,
  getOpeningHours,
  getPeopleCapacityString,
  getTranslatedProperty,
};

function combineReservations(reservations) {
  if (!reservations || !reservations.length) {
    return [];
  }

  const sorted = sortBy(reservations, 'begin');
  const initialValue = [clone(sorted[0])];

  return rest(sorted).reduce((previous, current) => {
    if (current.begin === last(previous).end) {
      last(previous).end = current.end;
    } else {
      previous.push(clone(current));
    }
    return previous;
  }, initialValue);
}

function isStaffEvent(reservation, resource) {
  if (!resource || !resource.requiredReservationExtraFields) {
    return false;
  }
  return some(resource.requiredReservationExtraFields, (field) => {
    return !reservation[camelCase(field)];
  });
}

function getAddress(item) {
  if (!item || isEmpty(item)) {
    return '';
  }

  const streetAddress = item.streetAddress ? item.streetAddress.fi : '';
  const zip = item.addressZip;
  const city = capitalize(item.municipality);

  return `${streetAddress}, ${zip} ${city}`;
}

function getAddressWithName(item) {
  const parts = [
    getName(item),
    getAddress(item),
  ];

  return filter(parts, part => part !== '').join(', ');
}

function getAvailableTime(openingHours = {}, reservations = []) {
  const { closes, opens } = openingHours;

  if (!closes || !opens) {
    return '0 tuntia vapaana';
  }

  const nowMoment = moment();
  const opensMoment = moment(opens);
  const closesMoment = moment(closes);

  if (nowMoment > closesMoment) {
    return '0 tuntia vapaana';
  }

  const beginMoment = nowMoment > opensMoment ? nowMoment : opensMoment;
  let total = closesMoment - beginMoment;

  forEach(
    filter(reservations, reservation => {
      return reservation.state !== 'cancelled' && moment(reservation.end) > nowMoment;
    }),
    (reservation) => {
      const resBeginMoment = moment(reservation.begin);
      const resEndMoment = moment(reservation.end);
      const maxBeginMoment = nowMoment > resBeginMoment ? nowMoment : resBeginMoment;
      total = total - resEndMoment + maxBeginMoment;
    }
  );

  const asHours = moment.duration(total).asHours();
  const rounded = Math.ceil(asHours * 2) / 2;

  return rounded === 1 ? `${rounded} tunti vapaana` : `${rounded} tuntia vapaana`;
}

function getCaption(item, language = 'fi') {
  return getTranslatedProperty(item, 'caption', language);
}

function getDescription(item, language = 'fi') {
  return getTranslatedProperty(item, 'description', language);
}

function getMainImage(images) {
  if (!images || !images.length) {
    return {};
  }

  return find(images, { type: 'main' }) || images[0];
}

function getMissingReservationValues(reservation) {
  const missingValues = {};
  REQUIRED_STAFF_EVENT_FIELDS.forEach((field) => {
    if (!reservation[field]) {
      missingValues[field] = '-';
    }
  });
  return missingValues;
}

function getName(item, language) {
  return getTranslatedProperty(item, 'name', language);
}

function getOpeningHours(item) {
  if (item && item.openingHours && item.openingHours.length) {
    return {
      closes: item.openingHours[0].closes,
      opens: item.openingHours[0].opens,
    };
  }

  return {};
}

function getPeopleCapacityString(capacity) {
  if (!capacity) {
    return '';
  }
  return `max ${capacity} hengelle.`;
}

function getTranslatedProperty(item, property, language = 'fi') {
  if (item && item[property] && item[property][language]) {
    return item[property][language];
  }
  return '';
}
