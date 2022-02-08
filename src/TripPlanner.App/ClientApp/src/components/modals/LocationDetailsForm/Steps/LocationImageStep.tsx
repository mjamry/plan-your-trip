import React from 'react';
import TextField from '@mui/material/TextField';
import { useLocationFormState, LocationFormStateActions } from '../LocationDetailsFormState';
import { IStepValidator } from './Step';
import LocationDto from '../../../../Common/Dto/LocationDto';
import useLocationStepsStyles from './LocationStepsStyles';

function LocationImageStepComponent() {
  const { state, dispatch } = useLocationFormState();
  const classes = useLocationStepsStyles();

  const handleImageUrlChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: LocationFormStateActions.updateLocation,
      data: { ...state.location, image: e.target.value },
    });
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
            value={state.location.image || ''}
          />
        </div>
      </div>
      <div className={classes.formRow}>
        <img src={state.location.image} className={classes.image} alt="" />
      </div>
    </form>
  );
}

export const LocationImageStepValidator = (): IStepValidator => {
  const validate = (location: LocationDto) => (!!location);

  return { validate };
};

export const LocationImageStep = LocationImageStepComponent;
