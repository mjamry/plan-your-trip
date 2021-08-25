import React from 'react'
import LocationFormMapView from '../../../MapView/LocationFormMapView'
import CoordinatesValidator from '../../../../Common/CoordinatesValidator'
import { useLocationFormState, LocationFormStateActions } from '../LocationDetailsFormState'
import TextField from '@material-ui/core/TextField'

const ERROR_MESSAGE = "Incorrect value";

export const LocationCoordinatesStep = () => {
    const [formState, dispatchFormState] = useLocationFormState();

    var handleCoordinatesChanged = (e) => {
        dispatchFormState({type: LocationFormStateActions.updateLocation, data: 
                                                                        {
                                                                            ...formState.location, 
                                                                            coordinates: {
                                                                                ...formState.location.coordinates, 
                                                                                [e.target.name]: e.target.value 
                                                                        }}})
    }

    var handleMapCoordinatesChanged = (coordinates) => {
        dispatchFormState({type: LocationFormStateActions.updateLocation, data: 
                                                                                {
                                                                                    ...formState.location,
                                                                                    coordinates: { 
                                                                                        lat: coordinates.lat, 
                                                                                        lon: coordinates.lng 
                                                                                }}})
    }

    return (
        <form>
            <div className="location-edit-form-row">
                <div className="location-edit-form-item">
                    <TextField 
                        name="lat" 
                        label="Latitude"
                        variant="outlined"
                        size="medium"
                        margin="dense"
                        onChange={handleCoordinatesChanged}
                        value={formState.location.coordinates.lat || ''}
                    />
                    <div className="location-form-error">{CoordinatesValidator().isValid(formState.location.coordinates.lat) ? "" : ERROR_MESSAGE}</div> 
                </div>
                
                <div className="location-edit-form-item">
                    <TextField 
                        name="lon" 
                        label="Longitude"
                        variant="outlined"
                        size="medium"
                        margin="dense"
                        onChange={handleCoordinatesChanged}
                        value={formState.location.coordinates.lon || ''}
                    />
                    <div className="location-form-error">{CoordinatesValidator().isValid(formState.location.coordinates.lon) ? "" : ERROR_MESSAGE}</div> 
                </div>

            </div>

            <div className="location-edit-form-row">
                    <LocationFormMapView location={formState.location} onCoordinatesUpdated={handleMapCoordinatesChanged}/>
                </div>
        </form>
    );
}

export const LocationCoordinatesStepValidator = () =>{
    var isValid = (location) => {
        return (CoordinatesValidator().isValid(location.coordinates.lat) && CoordinatesValidator().isValid(location.coordinates.lon))
    }

    return {isValid: isValid};
} 