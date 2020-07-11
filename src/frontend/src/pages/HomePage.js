
import React, {useState, useEffect} from 'react'
import AppLoader from './../AppLoader'
import useUserDataService from './../Services/UserDataService'
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
  container: {
    margin: '10px',
  },
  gridCard: {
    padding: '10px',
  }
}

const HomePage = ({classes}) => {
  const userService = useUserDataService();
  const [userData, setUserData] = useState(null);

  useEffect(()=>{
    const getUserData = async () => {
      const obtainedUserData = await userService.getDashboard();
      setUserData(obtainedUserData);
      console.log(userData)
    }

    getUserData();
  }, [])

  return (
    <>
      <AppLoader/>
      <div className={classes.container}>
        
        {userData && 
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.gridCard}>
              <Typography variant="h6">
                Search
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.gridCard}>
              <Typography variant="h6">
                You have <Typography variant="h3">{userData.listsCount}</Typography> lists
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.gridCard}>
            <Typography variant="h6">
                You have <Typography variant="h3">{userData.locationsCount}</Typography> locations
              </Typography>
            </Paper>
          </Grid>
        </Grid>}
      </div>
    </>
  )
}

export default withStyles(styles)(HomePage);