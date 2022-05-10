import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import CircularProgress from '@mui/material/CircularProgress';
import { IStepValidator } from './Step';
import LocationDto from '../../../../Common/Dto/LocationDto';
import useLocationStepsStyles from './LocationStepsStyles';
import { locationFormDataState, locationFormImageFile } from '../LocationDetailsFormState';
import useStorageService from '../../../../Services/StorageService';
import { isLoadingState, isLoadingTitleState } from '../../../../State/LocationsState';
import LocationImageMenu from './ImageStep/LocationImageMenu';
import { Nullable } from '../../../../Common/Dto/Nullable';
import CameraView from './ImageStep/CameraView';
import ImageWebSearch from './ImageStep/WebSearch';

export enum ImageProviderType {
  none = 'none',
  upload = 'upload',
  camera = 'camera',
  web = 'web',
}

function LocationImageStepComponent() {
  const classes = useLocationStepsStyles();
  const setImageFile = useSetRecoilState(locationFormImageFile);
  const data = useRecoilValue(locationFormDataState);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [imageProvider, setImageProvider] = useState<ImageProviderType>(ImageProviderType.none);
  const storageService = useStorageService();
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const setIsLoadingTitle = useSetRecoilState(isLoadingTitleState);

  const setDefaultImage = () => setImageUrl(storageService.generateUrlToFile(data.image));

  useEffect(() => {
    setDefaultImage();
  }, []);

  const handleImageSelected = async (imageFile: Nullable<File>) => {
    if (imageProvider !== ImageProviderType.none) {
      setImageProvider(ImageProviderType.none);
    }

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

  const renderProvider = () => {
    switch (imageProvider) {
      case ImageProviderType.camera:
        return (
          <CameraView
            onImageSelected={(file: Nullable<File>) => handleImageSelected(file)}
            setImageProvider={setImageProvider}
          />
        );

      case ImageProviderType.web:
        return (
          <ImageWebSearch
            onImageSelected={(file: Nullable<File>) => handleImageSelected(file)}
            setImageProvider={setImageProvider}
          />
        );

      default:
        return (
          <LocationImageMenu
            onImageSelected={(file: Nullable<File>) => handleImageSelected(file)}
            setImageProvider={setImageProvider}
          />
        );
    }
  };

  return (
    <>
      <div className={classes.formRow}>
        {isLoading
          ? <CircularProgress />
          : (imageUrl && imageProvider === ImageProviderType.none)
          && (

          <img
            src={imageUrl}
            className={classes.image}
            alt=""
          />
          )}
      </div>
      <form>
        <div className={classes.formRow}>
          { renderProvider() }
        </div>
      </form>
    </>
  );
}

export const LocationImageStepValidator = (): IStepValidator => {
  const validate = (location: LocationDto) => (!!location);

  return { validate };
};

export const LocationImageStep = LocationImageStepComponent;
