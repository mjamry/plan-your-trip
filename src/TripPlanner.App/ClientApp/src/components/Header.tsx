import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
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

const Header = () => {
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
};

export default Header;
