import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Nullable } from '../../../../Common/Dto/Nullable';
import useLocationStepsStyles from './LocationStepsStyles';

type Props = {
  onImageSelected: (image: Nullable<File>) => void;
};

function LocationImageMenu(props: Props) {
  const { onImageSelected } = props;
  const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement>();
  const open = Boolean(anchorEl);
  const classes = useLocationStepsStyles();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        variant="contained"
        component="span"
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Add photo
      </Button>
      <Menu
        id="menu-appbar"
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
        onClose={() => setAnchorEl(undefined)}
      >
        <MenuItem onClick={() => setAnchorEl(undefined)}>
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
        <MenuItem onClick={() => setAnchorEl(undefined)}>Take a photo</MenuItem>
        <MenuItem onClick={() => setAnchorEl(undefined)}>Search web</MenuItem>
      </Menu>
    </>
  );
}

export default LocationImageMenu;
