import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from '@mui/material/Button/Button';
import { IStepValidator } from './Step';
import LocationDto from '../../../../Common/Dto/LocationDto';
import useLocationStepsStyles from './LocationStepsStyles';
import { locationFormDataState, locationFormImageFile } from '../LocationDetailsFormState';
import useStorageService from '../../../../Services/StorageService';
import { isLoadingState, isLoadingTitleState } from '../../../../State/LocationsState';

function LocationImageStepComponent() {
  const classes = useLocationStepsStyles();
  const setImageFile = useSetRecoilState(locationFormImageFile);
  const data = useRecoilValue(locationFormDataState);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const storageService = useStorageService();
  const setIsLoading = useSetRecoilState(isLoadingState);
  const setIsLoadingTitle = useSetRecoilState(isLoadingTitleState);

  const setDefaultImage = () => setImageUrl(storageService.generateUrlToFile(data.image));

  useEffect(() => {
    setDefaultImage();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (files && files[0]) {
      setIsLoading(true);
      setIsLoadingTitle('Loading image');

      setImageFile(files[0]);

      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result?.toString());
        setIsLoading(false);
      };

      reader.readAsDataURL(files[0]);
    } else {
      setDefaultImage();
    }
  };

  return (
    <>
      <form>
        <div className={classes.formRow}>
          <div className={classes.formItem}>
            <label htmlFor="contained-button-file">
              <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                className={classes.imageInput}
                onChange={(event) => handleFileUpload(event.target.files)}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>

            </label>
          </div>
        </div>
      </form>
      { imageUrl
            && (
              <div className={classes.formRow}>
                <img
                  src={imageUrl}
                  className={classes.image}
                  alt=""
                />
              </div>
            )}
    </>
  );
}

export const LocationImageStepValidator = (): IStepValidator => {
  const validate = (location: LocationDto) => (!!location);

  return { validate };
};

export const LocationImageStep = LocationImageStepComponent;
