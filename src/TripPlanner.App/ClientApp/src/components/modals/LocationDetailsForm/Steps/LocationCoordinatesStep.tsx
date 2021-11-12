import React from 'react';
import TextField from '@material-ui/core/TextField';
import L from 'leaflet';
import LocationFormMapView from '../../../MapView/LocationFormMapView';
import useCoordinatesValidator from '../../../../Common/CoordinatesValidator';
import { useLocationFormState, LocationFormStateActions } from '../LocationDetailsFormState';
import { IStepValidator } from './Step';
import LocationDto from '../../../../Common/Dto/LocationDto';

const ERROR_MESSAGE = 'Incorrect value';

export const LocationCoordinatesStep = () => {
  const { state, dispatch } = useLocationFormState();
  const coordinatesValidator = useCoordinatesValidator();

  const handleCoordinatesChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (coordinatesValidator.isValid(e.target.value)) {
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
    }
  };

  const handleMapCoordinatesChanged = (coordinates: L.LatLng) => {
    dispatch({
      type: LocationFormStateActions.updateLocation,
      data:
        {
          ...state.location,
          coordinates: {
            lat: coordinates.lat,
            lon: coordinates.lng,
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
            value={state.location?.coordinates.lat || ''}
            helperText="test"
          />
          <div className="location-form-error">
            {coordinatesValidator.isValid(state.location.coordinates.lat) ? '' : ERROR_MESSAGE}
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
            {coordinatesValidator.isValid(state.location.coordinates.lon) ? '' : ERROR_MESSAGE}
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
  const coordinatesValidator = useCoordinatesValidator();

  const validate = (location: LocationDto) => (
    coordinatesValidator.isValid(location?.coordinates.lat)
    && coordinatesValidator.isValid(location?.coordinates.lon)
  );

  return { validate };
};
