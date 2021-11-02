import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const LoadingIndicator = () => {
    return (
    <div className="loading-indicator-container">
        <div>Please wait</div>
        <CircularProgress />
    </div>);
}

export default LoadingIndicator;