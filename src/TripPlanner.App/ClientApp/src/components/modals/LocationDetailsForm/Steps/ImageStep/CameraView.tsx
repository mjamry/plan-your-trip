/* eslint-disable jsx-a11y/media-has-caption */
import Button from '@mui/material/Button';
import React, { useEffect, useRef } from 'react';
import { Nullable } from '../../../../../Common/Dto/Nullable';
import useCameraProvider from '../../../../../Services/CameraProvider';
import useLocationStepsStyles from '../LocationStepsStyles';

type Props = {
  onImageSelected: (image: Nullable<File>) => void;
  setIsCameraViewVisible: (isVisible: boolean) => void;
}

function CameraView(props: Props) {
  const { onImageSelected, setIsCameraViewVisible } = props;
  const cameraProvider = useCameraProvider();
  const classes = useLocationStepsStyles();
  const canvasRef = useRef<any>(null);
  const videoRef = useRef<any>(null);

  useEffect(() => {
    const getImageFormCamera = async () => {
      const stream = await cameraProvider.getCameraStream();
      videoRef.current.srcObject = stream;
    };

    getImageFormCamera();
  }, []);

  const handleTakeAPhoto = () => {
    if (canvasRef.current) {
      canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasRef.current.toBlob((blob) => {
        const blobObject = new Blob([blob], { type: 'image/jpeg' });
        const imageFile = new File([blobObject], 'testName.jpg', { type: 'image/jpeg' });

        onImageSelected(imageFile);
      });
    }
  };

  return (
    <>
      <div className={classes.formItem}>
        <div className={classes.formRow}>
          <video ref={videoRef} id="video" className={classes.image} autoPlay />
          <canvas ref={canvasRef} id="canvas" width="320" height="240" style={{ display: 'none' }} />
        </div>

        <div className={classes.formRow}>
          <Button
            onClick={() => setIsCameraViewVisible(false)}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleTakeAPhoto()}
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
