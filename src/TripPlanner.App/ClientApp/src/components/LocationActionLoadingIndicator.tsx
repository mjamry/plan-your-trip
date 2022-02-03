import React from 'react';
import { CircularProgress } from '@mui/material';
import { useLocationsState } from '../State/LocationsState';

const LocationActionLoadingIndicator = () => {
  const { state } = useLocationsState();

  return (
    <div className="location-action-loading-indicator" style={{ display: state.isLoading ? 'block' : 'block' }}>
      <div className="location-action-loading-indicator-content">
        <div className="location-action-loading-indicator-content-title">Processing data</div>
        <CircularProgress />
      </div>
    </div>
  );
};

export default LocationActionLoadingIndicator;
