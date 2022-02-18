import React from 'react';
import TextField from '@mui/material/TextField';
import L from 'leaflet';
import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import LocationFormMapView from '../../../MapView/LocationFormMapView';
import useCoordinatesValidator from '../../../../Common/CoordinatesValidator';
import { IStepValidator } from './Step';
import LocationDto from '../../../../Common/Dto/LocationDto';
import useLocationProvider from '../../../../Services/LocationProvider';
import useLocationStepsStyles from './LocationStepsStyles';
import { locationFormDataState } from '../LocationDetailsFormState';

export function LocationCoordinatesStep() {
  const classes = useLocationStepsStyles();
  const coordinatesValidator = useCoordinatesValidator();
  const locationProvider = useLocationProvider();
  const [locationData, setLocationData] = useRecoilState(locationFormDataState);

  const handleCoordinatesChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (coordinatesValidator.isValid(e.target.value)) {
      setLocationData({
        ...locationData,
        coordinates: {
          ...locationData.coordinates,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  const handleMapCoordinatesChanged = (coordinates: L.LatLng) => {
    setLocationData({
      ...locationData,
      coordinates: {
        lat: coordinates.lat,
        lon: coordinates.lng,
      },
    });
  };

  const handleGetLocation = async () => {
    const userLocation = await locationProvider.getLocation();
    if (coordinatesValidator.isValid(userLocation.lat)
      && coordinatesValidator.isValid(userLocation.lon)) {
      setLocationData({
        ...locationData,
        coordinates: {
          lat: userLocation.lat,
          lon: userLocation.lon,
        },
      });
    }
  };

  return (
    <form>
      <div className={classes.formRow}>
        <div className={classes.formItem}>
          <TextField
            name="lat"
            label="Latitude"
            variant="outlined"
            size="medium"
            margin="dense"
            onChange={handleCoordinatesChanged}
            value={locationData.coordinates.lat || ''}
          />
        </div>

        <div className={classes.formItem}>
          <TextField
            name="lon"
            label="Longitude"
            variant="outlined"
            size="medium"
            margin="dense"
            onChange={handleCoordinatesChanged}
            value={locationData.coordinates.lon || ''}
          />
        </div>
      </div>

      {locationProvider.canGetLocation && (
        <div className={classes.formRow}>
          <Button
            onClick={handleGetLocation}
            size="small"
            variant="contained"
          >
            Get my location
          </Button>
        </div>
      )}

      <div className={classes.formRow}>
        <LocationFormMapView
          location={locationData}
          onCoordinatesUpdated={handleMapCoordinatesChanged}
        />
      </div>
    </form>
  );
}

export const LocationCoordinatesStepValidator = (): IStepValidator => {
  const coordinatesValidator = useCoordinatesValidator();

  const validate = (location: LocationDto) => (
    coordinatesValidator.isValid(location?.coordinates.lat)
    && coordinatesValidator.isValid(location?.coordinates.lon)
  );

  return { validate };
};
