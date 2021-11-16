import React, { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useUserDataService from '../Services/UserDataService';
import Loader from '../components/Loader';
import { DashboardDto } from '../Common/Dto/DashboardDto';

const useStyles = makeStyles({
  container: {
    margin: '10px',
  },
  gridCard: {
    padding: '10px',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
});

const DashboardPage = () => {
  const classes = useStyles();
  const userService = useUserDataService();
  const [userData, setUserData] = useState<DashboardDto>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      const obtainedUserData = await userService.getDashboard();
      setUserData(obtainedUserData);
      setIsLoading(false);
    };

    getUserData();
  }, []);

  return (
    <>
      {isLoading
        ? <Loader />
        : (
          <div className={classes.container}>
            {userData
          && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.gridCard}>
                <Typography variant="h6">
                  Welcome
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.gridCard}>
                <Typography variant="h6">You have</Typography>
                <Typography variant="h3">{userData.listsCount}</Typography>
                <Typography variant="h6">lists</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.gridCard}>
                <Typography variant="h6">You have</Typography>
                <Typography variant="h3">{userData.locationsCount}</Typography>
                <Typography variant="h6">locations</Typography>
              </Paper>
            </Grid>
          </Grid>
          )}
          </div>
        )}
    </>
  );
};

export default DashboardPage;
