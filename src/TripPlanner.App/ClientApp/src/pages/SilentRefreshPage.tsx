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

function SilentRefreshPage() {
  const userService = useUserService();
  const classes = useStyles();

  useEffect(() => {
    userService.silentRefresh();
  }, []);

  return (
    <div className={classes.root}>
      <Loader />
    </div>
  );
}

export default SilentRefreshPage;
