import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RatingButton from '../../../RatingButton';
import { useLocationFormState, LocationFormStateActions } from '../LocationDetailsFormState';
import { IStepValidator } from './Step';
import LocationDto from '../../../../Common/Dto/LocationDto';
import Search from '../../../Search/Search';
import useLocationStepsStyles from './LocationStepsStyles';

export function LocationDetailsStep() {
  const { state, dispatch } = useLocationFormState();
  const classes = useLocationStepsStyles();

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
        <div className={classes.formItem}>
          <Search name={state.location.name || ''} />
        </div>

        <div className={classes.formItem}>
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            size="medium"
            margin="dense"
            onChange={handleInputChanged}
            value={state.location.description || ''}
            multiline
            maxRows={5}
            inputProps={{
              maxLength: '200',
            }}
          />
        </div>

        <div className={classes.ratingButton}>
          <Typography component="legend">Rating</Typography>
          <RatingButton
            value={state.location.rating!}
            onSelect={(value: number) => { handleRatingChanged(value); }}
          />
        </div>
      </div>
    </form>
  );
}

export const LocationDetailsStepValidator = (): IStepValidator => {
  const validate = (location: LocationDto) => !!location.name;

  return { validate };
};
