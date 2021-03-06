import { expect } from 'chai';
import React from 'react';
import Label from 'react-bootstrap/lib/Label';
import Immutable from 'seamless-immutable';

import WrappedText from 'shared/wrapped-text';
import Resource from 'utils/fixtures/Resource';
import Unit from 'utils/fixtures/Unit';
import { shallowWithIntl } from 'utils/testUtils';
import FavoriteButton from 'shared/favorite-button';
import ResourceIcons from 'shared/resource-icons';
import ImageCarousel from './ImageCarousel';
import ResourceInfo from './ResourceInfo';

describe('pages/resource/resource-info/ResourceInfo', () => {
  const defaultProps = {
    isAdmin: false,
    resource: Immutable(Resource.build({
      description: 'Some description',
      images: [
        {
          foo: 'bar',
          type: 'other',
        },
        {
          foo: 'bar',
          type: 'main',
        },
        {
          foo: 'bar',
          type: 'other',
        },
      ],
    })),
    unit: Immutable(Unit.build()),
  };

  function getWrapper(extraProps) {
    return shallowWithIntl(<ResourceInfo {...defaultProps} {...extraProps} />);
  }

  describe('FavoriteButton', () => {
    it('is not rendered if user is not admin', () => {
      const favoriteButton = getWrapper({ isAdmin: false }).find(FavoriteButton);

      expect(favoriteButton.length).to.equal(0);
    });

    it('is rendered with correct props if user is admin', () => {
      const favoriteButton = getWrapper({ isAdmin: true }).find(FavoriteButton);

      expect(favoriteButton.length).to.equal(1);
      expect(favoriteButton.prop('resource')).to.deep.equal(defaultProps.resource);
    });
  });

  it('renders the name of the resource inside a h1 header', () => {
    const header = getWrapper().find('h1');
    const expected = defaultProps.resource.name;

    expect(header.props().children).to.equal(expected);
  });

  it('renders the unit name and address', () => {
    const unit = Unit.build({
      addressZip: '99999',
      municipality: 'helsinki',
      name: 'Unit name',
      streetAddress: 'Test street 12',
    });
    const address = getWrapper({ unit }).find('.address');
    const expected = 'Unit name, Test street 12, 99999 Helsinki';

    expect(address.props().children).to.equal(expected);
  });

  it('renders ResourceIcons component', () => {
    const resourceIcons = getWrapper().find(ResourceIcons);

    expect(resourceIcons.length).to.equal(1);
  });

  it('renders ImageCarousel component with ordered resource images', () => {
    const imageCarousel = getWrapper().find(ImageCarousel);

    expect(imageCarousel.length).to.equal(1);
    expect(imageCarousel.prop('images')).to.deep.equal([
      defaultProps.resource.images[1],     // main image
      defaultProps.resource.images[0],
      defaultProps.resource.images[2],
    ]);
  });

  it('renders resource equipment', () => {
    const equippedResource = {
      ...defaultProps.resource,
      equipment: [
        { id: 1, name: 'projector' },
        { id: 2, name: 'whiteboard' },
      ],
    };
    const resourceEquipment = (
      getWrapper({ resource: equippedResource }).find('.resource-equipment')
    );
    const nameLabel = resourceEquipment.find('.details-label');
    expect(nameLabel.text()).to.equal('ResourceInfo.equipmentHeader');
    const equipmentLabels = resourceEquipment.find(Label);
    expect(equipmentLabels).to.have.length(2);
    expect(equipmentLabels.children().get(0)).to.equal('projector');
    expect(equipmentLabels.children().get(1)).to.equal('whiteboard');
  });

  it('does not render resource equipment if empty', () => {
    const resourceEquipment = getWrapper().find('.resource-equipment');
    expect(resourceEquipment).to.have.length(0);
  });

  it('renders resource description as WrappedText', () => {
    const wrappedText = getWrapper().find(WrappedText);
    const expectedText = defaultProps.resource.description;

    expect(wrappedText.length).to.equal(1);
    expect(wrappedText.props().text).to.equal(expectedText);
  });
});
