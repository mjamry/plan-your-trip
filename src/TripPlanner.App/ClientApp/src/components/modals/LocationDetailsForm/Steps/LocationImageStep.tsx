import React from 'react';
import TextField from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';
import { useLocationFormState, LocationFormStateActions } from '../LocationDetailsFormState';
import { IStepValidator } from './Step';
import LocationDto from '../../../../Common/Dto/LocationDto';

const useStyles = makeStyles({
  image: {
    maxWidth: '200px',
    maxHeight: '200px',
  },
});

const LocationImageStepComponent = () => {
  const { state, dispatch } = useLocationFormState();
  const classes = useStyles();

  const handleImageUrlChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: LocationFormStateActions.updateLocation,
      data: { ...state.location, image: e.target.value },
    });
  };

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
            value={state.location.image || ''}
          />
        </div>
      </div>
      <div className="location-edit-form-row">
        <img src={state.location.image} className={classes.image} alt="" />
      </div>
    </form>
  );
};

export const LocationImageStepValidator = (): IStepValidator => {
  const validate = (location: LocationDto) => (!!location);

  return { validate };
};

export const LocationImageStep = LocationImageStepComponent;
