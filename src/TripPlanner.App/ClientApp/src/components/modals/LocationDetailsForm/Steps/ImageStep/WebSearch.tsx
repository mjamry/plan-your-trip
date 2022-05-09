/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Nullable } from '../../../../../Common/Dto/Nullable';
import useWikiSearch from '../../../../../Common/WikiSearchService';
import { locationFormDataState } from '../../LocationDetailsFormState';
import { ImageProviderType } from '../LocationImageStep';
import useLocationStepsStyles from '../LocationStepsStyles';

type Props = {
  onImageSelected: (image: Nullable<File>) => void;
  setImageProvider: (provider: ImageProviderType) => void;
};

function ImageWebSearch(props: Props) {
  const { onImageSelected, setImageProvider } = props;
  const locationFormData = useRecoilValue(locationFormDataState);
  const wikiSearchService = useWikiSearch();
  const [images, setImages] = useState<string[]>([]);
  const classes = useLocationStepsStyles();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const searchImages = async () => {
      const wiki = await wikiSearchService.getImages(locationFormData.name);
      setImages(wiki);
      setIsLoading(false);
    };

    searchImages();
  }, []);

  const handleImageSelected = async (url: string) => {
    fetch(url).then((result) => result.blob()).then((blob) => {
      const imageFile = new File([blob], 'searchwebimage.jpg', { type: 'image/jpeg' });
      onImageSelected(imageFile);
    });
  };

  return (
    <div className={classes.formItem}>
      <div className={classes.formRow}>
        {isLoading
          ? <CircularProgress />
          : (
            <div className={classes.webSearchContainer}>
              {images.length > 0
                ? images.map((image) => (
                  <img
                    className={classes.webSearchImage}
                    src={image}
                    alt=""
                    onClick={() => handleImageSelected(image)}
                    onKeyDown={() => handleImageSelected(image)}
                    tabIndex={-1}
                    aria-label=""
                    title={image}
                  />
                ))
                : 'No images'}
            </div>

          )}
      </div>
      <div className={classes.formRow}>
        <Button
          onClick={() => setImageProvider(ImageProviderType.none)}
          variant="contained"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ImageWebSearch;
