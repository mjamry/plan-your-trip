import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LoadingIndicator = () => {
    return (
    <div className="loading-indicator-container">
        <div>Please wait</div>
        <FontAwesomeIcon icon="spinner" spin className="fa-2x"/> 
    </div>);
}

export default LoadingIndicator;