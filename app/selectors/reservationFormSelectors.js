import _ from 'lodash';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';

import types from 'constants/ActionTypes';
import {
  combineReservations,
  getOpeningHours,
} from 'utils/DataUtils';
import { getDateString, getTimeSlots } from 'utils/TimeUtils';
import ModalTypes from 'constants/ModalTypes';

const activeRequestsSelector = (state) => state.api.activeRequests;
const dateSelector = (state) => state.ui.reservation.date;
const idSelector = (state) => state.router.params.id;
const openModalsSelector = (state) => state.ui.modals.open;
const pendingReservationsCountSelector = (state) => state.api.pendingReservationsCount;
const resourcesSelector = (state) => state.data.resources;
const selectedSelector = (state) => state.ui.reservation.selected;

export const reservationFormSelectors = createSelector(
  activeRequestsSelector,
  dateSelector,
  idSelector,
  openModalsSelector,
  pendingReservationsCountSelector,
  resourcesSelector,
  selectedSelector,
  (
    activeRequests,
    date,
    id,
    openModals,
    pendingReservationsCount,
    resources,
    selected
  ) => {
    const confirmReservationModalIsOpen = _.includes(openModals, ModalTypes.CONFIRM_RESERVATION);
    const isFetchingResource = _.includes(activeRequests, types.API.RESOURCE_GET_REQUEST);
    const resource = resources[id] || {};
    const { closes, opens } = getOpeningHours(resource);
    const period = resource.minPeriod ? resource.minPeriod : undefined;
    const reservations = resource.reservations || undefined;
    const timeSlots = getTimeSlots(opens, closes, period, reservations);

    const selectedSlots = selected.map(current => {
      return {
        begin: current.split('/')[0],
        end: current.split('/')[1],
        resource: id,
      };
    });
    const selectedReservations = Immutable(combineReservations(selectedSlots));

    return {
      confirmReservationModalIsOpen,
      date: getDateString(date),
      id,
      isFetchingResource,
      isMakingReservations: Boolean(pendingReservationsCount),
      selected,
      selectedReservations,
      timeSlots,
    };
  }
);
