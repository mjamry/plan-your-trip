import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var LocationButtons = ({onEdit, onRemove}) => {
    return (
        <div className="location-card-buttons-container">
            <button
                title="edit location" 
                onClick={onEdit}
                className="location-card-button">
                <FontAwesomeIcon icon="edit" /> Edit
            </button>
            <button 
                title="remove location" 
                onClick={onRemove}
                className="location-card-button">
                <FontAwesomeIcon icon="trash-alt" /> Remove
            </button>
        </div>
    );
}

export default LocationButtons