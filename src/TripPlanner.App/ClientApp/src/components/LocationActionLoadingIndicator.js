import React from 'react'
import { useLocationsState } from '../State/LocationsState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LocationActionLoadingIndicator = () => {
    const [{ isLoading }, dispatchLocations] = useLocationsState();

    return (
        <div className="location-action-loading-indicator" style={{display: isLoading ? "block" : "none"}}>
            <div className="location-action-loading-indicator-content">
                <div className="location-action-loading-indicator-content-title">Processing data</div><FontAwesomeIcon icon="spinner" spin className="fa-2x" />
            </div>
        </div>
    )
}

export default LocationActionLoadingIndicator;