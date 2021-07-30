import React from 'react'
import { useLocationFormState, LocationFormStateActions } from '../LocationDetailsFormState'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';

const imageStyle = {
    image: {
        maxWidth: '200px',
        maxHeight: '200px'
    }
}

const LocationImageStepComponent = ({classes}) => {
    const [formState, dispatchFormState] = useLocationFormState();

    var handleImageUrlChanged = (e) => {
        dispatchFormState({type: LocationFormStateActions.updateLocation, data: {...formState.location, image: e.target.value }})
    }

    return (
        <form>
            <div className="location-edit-form-row">
                <div className="location-edit-form-item">
                    <TextField 
                        name="image" 
                        label="Image URL"
                        variant="outlined"
                        size="medium"
                        margin="dense"
                        onChange={handleImageUrlChanged}
                        value={formState.location.image || ''}
                    />
                </div>
            </div>
            <div className="location-edit-form-row">
                <img src={formState.location.image} className={classes.image}/>
            </div>
        </form>)
}

export const LocationImageStepValidator = () => {
    const isValid = (location) => {
        return true;
    }
}

export const LocationImageStep = withStyles(imageStyle)(LocationImageStepComponent)

