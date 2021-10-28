import React from 'react';
import TextField from '@material-ui/core/TextField';
import LocationFormMapView from '../../../MapView/LocationFormMapView';
import CoordinatesValidator from '../../../../Common/CoordinatesValidator';
import { useLocationFormState, LocationFormStateActions } from '../LocationDetailsFormState';
import { CoordinateDto } from '../../../../Common/Dto/CoordinateDto';
import { IStepValidator } from './Step';
import LocationDto from '../../../../Common/Dto/LocationDto';

const ERROR_MESSAGE = 'Incorrect value';

export const LocationCoordinatesStep = () => {
  const { state, dispatch } = useLocationFormState();

  const handleCoordinatesChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: LocationFormStateActions.updateLocation,
      data:
        {
          ...state.location,
          coordinates: {
            ...state.location.coordinates,
            [e.target.name]: e.target.value,
          },
        },
    });
  };

  const handleMapCoordinatesChanged = (coordinates: CoordinateDto) => {
    dispatch({
      type: LocationFormStateActions.updateLocation,
      data:
        {
          ...state.location,
          coordinates: {
            lat: coordinates.lat,
            lon: coordinates.lon,
          },
        },
    });
  };

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
            value={state.location.coordinates.lat || ''}
          />
          <div className="location-form-error">
            {CoordinatesValidator().isValid(state.location.coordinates.lat) ? '' : ERROR_MESSAGE}
          </div>
        </div>

        <div className="location-edit-form-item">
          <TextField
            name="lon"
            label="Longitude"
            variant="outlined"
            size="medium"
            margin="dense"
            onChange={handleCoordinatesChanged}
            value={state.location.coordinates.lon || ''}
          />
          <div className="location-form-error">
            {CoordinatesValidator().isValid(state.location.coordinates.lon) ? '' : ERROR_MESSAGE}
          </div>
        </div>

      </div>

      <div className="location-edit-form-row">
        <LocationFormMapView
          location={state.location}
          onCoordinatesUpdated={handleMapCoordinatesChanged}
        />
      </div>
    </form>
  );
};

export const LocationCoordinatesStepValidator = (): IStepValidator => {
  const validate = (location: LocationDto) => (
    CoordinatesValidator().isValid(location.coordinates.lat)
    && CoordinatesValidator().isValid(location.coordinates.lon)
  );

  return { validate };
};
