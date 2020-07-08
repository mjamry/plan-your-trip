import React from 'react'
import RatingButton from '../../../RatingButton'
import { useLocationFormState, LocationFormStateActions } from '../LocationDetailsFormState'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const ERROR_MESSAGE = "Incorrect value";

export const LocationDetailsStep = () => {
    const [formState, dispatchFormState] = useLocationFormState();

    var handleInputChanged = (e) => {
        dispatchFormState({type: LocationFormStateActions.updateLocation, data: {...formState.location, [e.target.name]: e.target.value }})
    }

    var handleRatingChanged = (value) => {
        dispatchFormState({type: LocationFormStateActions.updateLocation, data: {...formState.location, rating: value}})
    }

    return (
        <form>
            <div >
                <div className="location-edit-form-item">
                    <TextField 
                        name="name" 
                        label="Name"
                        variant="outlined"
                        size="medium"
                        margin="dense"
                        onChange={handleInputChanged}
                        value={formState.location.name || ''}
                        autoFocus
                        required
                        inputProps={{
                            maxlength: '50',
                        }}
                    />
                </div>
              
                <div className="location-edit-form-item">
                    <TextField 
                        name="description" 
                        label="Description"
                        variant="outlined"
                        size="medium"
                        margin="dense"
                        onChange={handleInputChanged}
                        value={formState.location.description || ''}
                        multiline
                        rowsMax={5}
                        inputProps={{
                            maxlength: '200',
                        }}
                    />
                </div>

                <div className="location-edit-form-item-rating">
                    <Typography component="legend">Rating</Typography>
                    <RatingButton 
                        value={formState.location.rating || ''} 
                        onSelect={(value)=>{handleRatingChanged(value)}}
                    />
                </div>
            </div>
        </form>
    );
}

export const LocationDetailsStepValidator = () => {

    var isValid = (location) => {
        return !!location.name;
    }

    return {isValid: isValid};
}