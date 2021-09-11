import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import RatingButton from '../../../RatingButton';
import { useLocationFormState, LocationFormStateActions } from '../LocationDetailsFormState';
import { Location } from '../../../../Common/Dto/Location';
import { IStepValidator } from './Step';

export const LocationDetailsStep = () => {
  const { state, dispatch } = useLocationFormState();

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: LocationFormStateActions.updateLocation,
      data: { ...state.location, [e.target.name]: e.target.value },
    });
  };

  const handleRatingChanged = (value: number) => {
    dispatch({
      type: LocationFormStateActions.updateLocation,
      data: { ...state.location, rating: value },
    });
  };

  return (
    <form>
      <div>
        <div className="location-edit-form-item">
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            size="medium"
            margin="dense"
            onChange={handleInputChanged}
            value={state.location.name || ''}
            autoFocus
            required
            inputProps={{
              maxLength: '50',
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
            value={state.location.description || ''}
            multiline
            rowsMax={5}
            inputProps={{
              maxLength: '200',
            }}
          />
        </div>

        <div className="location-edit-form-item-rating">
          <Typography component="legend">Rating</Typography>
          <RatingButton
            value={state.location.rating}
            onSelect={(value: number) => { handleRatingChanged(value); }}
          />
        </div>
      </div>
    </form>
  );
};

export const LocationDetailsStepValidator = (): IStepValidator => {
  const validate = (location: Location) => !!location.name;

  return { validate };
};
