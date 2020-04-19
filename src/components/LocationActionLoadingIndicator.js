import React from 'react'
import { useLocationsState } from '../State/LocationsState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LocationActionLoadingIndicator = () => {
    const [{ isLoading }, dispatchLocations] = useLocationsState();

    return (
        <div className="location-action-loading-indicator" style={{display: isLoading ? "block" : "none"}}>
            <FontAwesomeIcon icon="spinner" spin className="fa-2x" />
        </div>
    )
}

export default LocationActionLoadingIndicator;