import React, { PropTypes } from 'react';

import WrappedText from 'components/common/WrappedText';
import ResourceIcons from 'screens/shared/resource-icons';
import { getName, getProperty } from 'utils/translationUtils';
import { getAddressWithName } from 'utils/unitUtils';
import ImageCarousel from './ImageCarousel';

function ResourceInfo({ resource, unit }) {
  return (
    <div className="resource-info">
      <h1>{getName(resource)}</h1>
      <address className="lead">{getAddressWithName(unit)}</address>
      <ResourceIcons resource={resource} />
      <ImageCarousel
        altText={`Kuva ${getName(resource)} tilasta`}
        images={resource.images || []}
      />
      <WrappedText text={getProperty(resource, 'description')} />
    </div>
  );
}

ResourceInfo.propTypes = {
  resource: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
};

export default ResourceInfo;
