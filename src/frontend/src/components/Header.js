import React, {useEffect, useState} from 'react';
import {useAppState} from '../State/AppState'
import useUserService from './../Services/UserService'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  header: {
    zIndex: 1200,
    backgroundColor: '#363538'
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    flexGrow: '1',
    textAlign: 'left'
  },
  userMenu: {
  }
}

var Header = (props) => {
  const [userName, setUserName] = useState(null);
  const [appState, dispatchUser] = useAppState(null);
  const userService = useUserService();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(()=>
  {
    var getUserName = async () => {
      var user = await userService.getUser();
      setUserName(user.profile.name);
    }

    if(appState.userSignedIn){
      getUserName();
    }
  }, [appState.userSignedIn])

  const renderUserInfo = () => {
      return (
      <div className={props.classes.userMenu}>
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
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
        <MenuItem onClick={() =>  userService.signOut()}>Logout</MenuItem>
      </Menu>
      </div>
    )
  }

  return (
      <AppBar position="fixed" className={props.classes.header}>
        <Toolbar className={props.classes.toolbar}>
          <Typography variant="h6" className={props.classes.title}>
            Trip Planner
          </Typography>
          {userName && renderUserInfo()}
        </Toolbar>
      </AppBar>
  )
}

export default withStyles(styles)(Header);