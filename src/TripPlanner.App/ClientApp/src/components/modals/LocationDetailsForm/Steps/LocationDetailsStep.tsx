import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRecoilState } from 'recoil';
import RatingButton from '../../../RatingButton';
import { IStepValidator } from './Step';
import LocationDto from '../../../../Common/Dto/LocationDto';
import Search from '../../../Search/Search';
import useLocationStepsStyles from './LocationStepsStyles';
import { locationFormDataState } from '../LocationDetailsFormState';

export function LocationDetailsStep() {
  const classes = useLocationStepsStyles();
  const [locationData, setLocationData] = useRecoilState(locationFormDataState);

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationData({ ...locationData, [e.target.name]: e.target.value });
  };

  const handleRatingChanged = (value: number) => {
    setLocationData({ ...locationData, rating: value });
  };

  return (
    <form>
      <div>
        <div className={classes.formItem}>
          <Search name={locationData.name || ''} />
        </div>

        <div className={classes.formItem}>
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            size="medium"
            margin="dense"
            onChange={handleInputChanged}
            value={locationData.description || ''}
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
            value={locationData.rating!}
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
