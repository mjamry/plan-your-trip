import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingIndicator() {
  return (
    <div className="loading-indicator-container">
      <div>Please wait</div>
      <CircularProgress />
    </div>
  );
}

export default LoadingIndicator;
