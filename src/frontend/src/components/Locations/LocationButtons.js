import React from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

var LocationButtons = ({onEdit, onRemove}) => {
    return (
        <div className="location-card-buttons-container">
            <Button
                title="edit location" 
                onClick={onEdit}
                className="location-card-button location-card-button-left"
                startIcon={<EditIcon/>}
            >
            Edit
            </Button>
            <Button 
                title="remove location" 
                onClick={onRemove}
                className="location-card-button"
                startIcon={<DeleteIcon/>}
            >
            Remove
            </Button>
        </div>
    );
}

export default LocationButtons