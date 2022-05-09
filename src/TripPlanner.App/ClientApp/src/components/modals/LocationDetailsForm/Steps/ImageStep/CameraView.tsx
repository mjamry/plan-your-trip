/* eslint-disable jsx-a11y/media-has-caption */
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useRef, useState } from 'react';
import { Nullable } from '../../../../../Common/Dto/Nullable';
import useCameraProvider from '../../../../../Services/CameraProvider';
import { ImageProviderType } from '../LocationImageStep';
import useLocationStepsStyles from '../LocationStepsStyles';

type Props = {
  onImageSelected: (image: Nullable<File>) => void;
  setImageProvider: (provider: ImageProviderType) => void;
}

function CameraView(props: Props) {
  const { onImageSelected, setImageProvider } = props;
  const cameraProvider = useCameraProvider();
  const classes = useLocationStepsStyles();
  const canvasRef = useRef<any>(null);
  const videoRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getImageFormCamera = async () => {
      setIsLoading(true);
      try {
        const stream = await cameraProvider.getCameraStream();
        videoRef.current.srcObject = stream;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getImageFormCamera();
  }, []);

  const stopCamera = () => {
    videoRef.current.srcObject.getTracks()[0].stop();
  };

  const handleTakeAPhoto = () => {
    if (canvasRef.current) {
      canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasRef.current.toBlob((blob) => {
        const blobObject = new Blob([blob], { type: 'image/jpeg' });
        const imageFile = new File([blobObject], 'cameraimage.jpg', { type: 'image/jpeg' });

        onImageSelected(imageFile);
      });
    }
  };

  return (
    <>
      <div className={classes.formItem}>
        { isLoading && <div className={classes.formRow}><CircularProgress /></div> }
        <div className={classes.formRow}>
          <video ref={videoRef} id="video" className={classes.cameraView} autoPlay style={{ display: isLoading ? 'none' : '' }} />
          <canvas ref={canvasRef} id="canvas" className={classes.cameraCanvas} style={{ display: 'none' }} />
        </div>

        <div className={classes.formRow}>
          <Button
            onClick={() => {
              setImageProvider(ImageProviderType.none);
              stopCamera();
            }}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleTakeAPhoto();
              stopCamera();
            }}
            variant="contained"
          >
            Take a photo
          </Button>
        </div>
      </div>
    </>
  );
}

export default CameraView;
