import React, { useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import useUserService from '../Services/UserService';
import Loader from '../components/Loader';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function CallbackPage() {
  const userService = useUserService();
  const classes = useStyles();

  useEffect(() => {
    userService.finishAuthentication();
  }, []);

  return (
    <div className={classes.root}>
      <Loader />
    </div>
  );
}

export default CallbackPage;
