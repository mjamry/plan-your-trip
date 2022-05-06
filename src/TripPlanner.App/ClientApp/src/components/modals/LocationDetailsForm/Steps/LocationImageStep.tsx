import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IStepValidator } from './Step';
import LocationDto from '../../../../Common/Dto/LocationDto';
import useLocationStepsStyles from './LocationStepsStyles';
import { locationFormDataState, locationFormImageFile } from '../LocationDetailsFormState';
import useStorageService from '../../../../Services/StorageService';
import { isLoadingState, isLoadingTitleState } from '../../../../State/LocationsState';
import LocationImageMenu from './LocationImageMenu';
import { Nullable } from '../../../../Common/Dto/Nullable';

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

  const handleImageSelected = async (imageFile: Nullable<File>) => {
    if (imageFile) {
      setIsLoading(true);
      setIsLoadingTitle('Loading image');

      setImageFile(imageFile);

      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result?.toString());
        setIsLoading(false);
      };

      reader.readAsDataURL(imageFile);
    } else {
      setDefaultImage();
    }
  };

  return (
    <>
      <form>
        <div className={classes.formRow}>
          <LocationImageMenu
            onImageSelected={(file: Nullable<File>) => handleImageSelected(file)}
          />
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
