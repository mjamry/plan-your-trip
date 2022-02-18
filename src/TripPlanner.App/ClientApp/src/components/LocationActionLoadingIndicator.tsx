import React from 'react';
import { CircularProgress } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { isLoadingState } from '../State/LocationsState';

function LocationActionLoadingIndicator() {
  const isLoading = useRecoilValue(isLoadingState);

  return (
    <div className="location-action-loading-indicator" style={{ display: isLoading ? 'block' : 'none' }}>
      <div className="location-action-loading-indicator-content">
        <div className="location-action-loading-indicator-content-title">Processing data</div>
        <CircularProgress />
      </div>
    </div>
  );
}

export default LocationActionLoadingIndicator;
