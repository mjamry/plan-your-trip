import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIndicator = () => (
  <div className="loading-indicator-container">
    <div>Please wait</div>
    <CircularProgress />
  </div>
);

export default LoadingIndicator;
