import React from 'react';
import TextField from '@mui/material/TextField';
import { useRecoilState } from 'recoil';
import { IStepValidator } from './Step';
import LocationDto from '../../../../Common/Dto/LocationDto';
import useLocationStepsStyles from './LocationStepsStyles';
import { locationFormDataState } from '../LocationDetailsFormState';

function LocationImageStepComponent() {
  const classes = useLocationStepsStyles();
  const [locationData, setLocationData] = useRecoilState(locationFormDataState);

  const handleImageUrlChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationData({ ...locationData, image: e.target.value });
  };

  return (
    <form>
      <div className={classes.formRow}>
        <div className={classes.formItem}>
          <TextField
            name="image"
            label="Image URL"
            variant="outlined"
            size="medium"
            margin="dense"
            onChange={handleImageUrlChanged}
            value={locationData.image || ''}
          />
        </div>
      </div>
      <div className={classes.formRow}>
        <img src={locationData.image} className={classes.image} alt="" />
      </div>
    </form>
  );
}

export const LocationImageStepValidator = (): IStepValidator => {
  const validate = (location: LocationDto) => (!!location);

  return { validate };
};

export const LocationImageStep = LocationImageStepComponent;
