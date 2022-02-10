import React, { useEffect, useState } from 'react';

import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAppState } from '../State/AppState';
import useUserService from '../Services/UserService';

const useStyles = makeStyles({
  header: {
    zIndex: 1201,
    backgroundColor: '#363538',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
});

function Header() {
  const [userName, setUserName] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement>();
  const { state: appState } = useAppState();
  const userService = useUserService();
  const open = Boolean(anchorEl);
  const classes = useStyles();

  useEffect(() => {
    const getUserName = async () => {
      const user = await userService.getUser();
      if (user.profile.name) {
        setUserName(user.profile.name);
      }
    };

    if (appState.userSignedIn) {
      getUserName();
    }
  }, [appState.userSignedIn]);

  const renderUserInfo = () => (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        color="inherit"
        size="large"
      >
        <Typography variant="h6">
          {userName}
        </Typography>
        <AccountCircle />
      </IconButton>
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
        <MenuItem onClick={() => setAnchorEl(undefined)}>Profile</MenuItem>
        <MenuItem onClick={() => setAnchorEl(undefined)}>My account</MenuItem>
        <MenuItem onClick={() => userService.signOut()}>Logout</MenuItem>
      </Menu>
    </div>
  );

  return (
    <AppBar position="fixed" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Trip Planner
        </Typography>
        {userName && renderUserInfo()}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
