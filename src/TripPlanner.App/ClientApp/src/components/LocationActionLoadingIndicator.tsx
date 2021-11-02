import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocationsState } from '../State/LocationsState';

const LocationActionLoadingIndicator = () => {
  const { state } = useLocationsState();

  return (
    <div className="location-action-loading-indicator" style={{ display: state.isLoading ? 'block' : 'none' }}>
      <div className="location-action-loading-indicator-content">
        <div className="location-action-loading-indicator-content-title">Processing data</div>
        <FontAwesomeIcon icon="spinner" spin className="fa-2x" />
      </div>
    </div>
  );
};

export default LocationActionLoadingIndicator;
