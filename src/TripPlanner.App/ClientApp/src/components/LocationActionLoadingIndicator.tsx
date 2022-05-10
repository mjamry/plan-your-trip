import React from 'react';
import { CircularProgress } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { isLoadingState, isLoadingTitleState } from '../State/LocationsState';

function LocationActionLoadingIndicator() {
  const isLoading = useRecoilValue(isLoadingState);
  const isLoadingTitle = useRecoilValue(isLoadingTitleState);

  return (
    <div className="location-action-loading-indicator" style={{ display: isLoading ? 'block' : 'none' }}>
      <div className="location-action-loading-indicator-content">
        <div className="location-action-loading-indicator-content-title">{isLoadingTitle}</div>
        <CircularProgress />
      </div>
    </div>
  );
}

export default LocationActionLoadingIndicator;
