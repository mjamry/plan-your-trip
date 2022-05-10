import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Nullable } from '../../../../../Common/Dto/Nullable';
import useLocationStepsStyles from '../LocationStepsStyles';
import useCameraProvider from '../../../../../Services/CameraProvider';
import { ImageProviderType } from '../LocationImageStep';

type Props = {
  onImageSelected: (image: Nullable<File>) => void;
  setImageProvider: (provider: ImageProviderType) => void;
};

function LocationImageMenu(props: Props) {
  const { onImageSelected, setImageProvider } = props;
  const classes = useLocationStepsStyles();
  const cameraProvider = useCameraProvider();
  const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement>();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const hideMenu = () => {
    setAnchorEl(undefined);
  };

  return (
    <>
      <Button
        variant="contained"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Add photo
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={() => hideMenu()}
      >
        <MenuItem onClick={() => hideMenu()}>
          <label htmlFor="contained-button-file">
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              className={classes.imageInput}
              onChange={(event) => onImageSelected(
                event.target.files ? event.target.files[0] : null,
              )}
            />
            Upload file
          </label>
        </MenuItem>
        {cameraProvider.canUseCamera
          && (
          <MenuItem
            onClick={() => {
              setImageProvider(ImageProviderType.camera);
              hideMenu();
            }}
          >
            Take a photo
          </MenuItem>
          )}
        <MenuItem
          onClick={() => {
            setImageProvider(ImageProviderType.web);
            hideMenu();
          }}
        >
          Search web
        </MenuItem>
      </Menu>
    </>
  );
}

export default LocationImageMenu;
