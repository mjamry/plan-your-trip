import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var LocationButtons = ({onEdit, onRemove}) => {
    return (
        <div className="grid-locations-container">
            <button
                title="edit location" 
                onClick={onEdit}
                className="grid-location-buttons">
                <FontAwesomeIcon icon="edit" /> Edit
            </button>
            <button 
                title="remove location" 
                onClick={onRemove}
                className="grid-location-buttons">
                <FontAwesomeIcon icon="trash-alt" /> Remove
            </button>
        </div>
    );
}

export default LocationButtons