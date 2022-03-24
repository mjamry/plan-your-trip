import React from 'react';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import { useRecoilValue } from 'recoil';
import { generatePath } from 'react-router';
import useUserService from '../Services/UserService';
import { ReactComponent as Welcome } from '../assets/images/welcome2.svg';
import { appSettingsState } from '../State/AppState';
import RouteTypes from '../Common/RouteTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentRoot: {
    width: '70vw',
    height: '60vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '1em',
    backgroundImage: 'url("../assets/images/welcome2.svg")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '4em',
  },
  right: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  image: {
    width: '40em',
    height: '40em',
    marginRight: '40px',
  },
  title: {
    fontSize: '30pt',
    fontWeight: 'bold',
    textAlign: 'left',
    margin: '1em',
  },
  description: {
    fontSize: '12pt',
    textAlign: 'left',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3em',
    marginLeft: '4em',
    '& Button': {
      margin: '1em',
    },
  },
  logo: {
    position: 'relative',
    top: '1em',
    left: '1em',
  },
}));

function WelcomePage() {
  const userService = useUserService();
  const classes = useStyles();
  const appSettings = useRecoilValue(appSettingsState);

  return (
    <div className={classes.root}>
      <div className={classes.contentRoot}>
        <div className={classes.logo} />
        <div className={classes.left}>
          <div className={classes.title}>
            Search.
            <br />
            Plan.
            <br />
            Travel.
          </div>
          <div className={classes.description}>
            We will help you to easily create your dreamed trip.
            <br />
            You can focus on the places you like to visit, we will do the rest.
          </div>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => userService.signIn()}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => window.location.assign(generatePath(RouteTypes.register, { authUrl: `${appSettings.authUrl}` }))}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <div className={classes.right}>
          <Welcome className={classes.image} />
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
