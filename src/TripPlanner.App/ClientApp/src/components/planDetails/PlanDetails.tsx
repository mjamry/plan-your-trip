import React from 'react';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: '0.25',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid red',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
    },
  },
  row: {
    marginTop: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    maxWidth: '14rem',
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      padding: '0.1rem',
    },
  },
  dateInput: {
    maxWidth: '10rem',
    backgroundColor: 'red',
  },
  planDetailsCard: {
    paddingBottom: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      paddingRight: '1rem',
      paddingLeft: '1rem',
      marginBottom: 0,
    },
  },
  nonMandatoryCard: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

const PlanDetails = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper className={classes.planDetailsCard}>
        <div className={classes.row}>
          <TextField
            label="Plan name"
            value="Poland trip"
          />
        </div>
        <div className={classes.row}>
          <DesktopDatePicker
            label="Start time"
            inputFormat="DD/MM/YYYY"
            value={dayjs()}
            // eslint-disable-next-line no-console
            onChange={(date) => console.log(date)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
            className={classes.dateInput}
          />
        </div>
        <div className={classes.row}>
          <DesktopDatePicker
            label="Start time"
            inputFormat="DD/MM/YYYY"
            value={dayjs().add(5, 'day')}
            // eslint-disable-next-line no-console
            onChange={(date) => console.log(date)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
            className={classes.dateInput}
          />
        </div>
      </Paper>
      <Paper className={`${classes.planDetailsCard} ${classes.nonMandatoryCard}`}>
        <div className={classes.row}>
          <TextField
            label="Distance"
            value="150km"
            disabled
          />
        </div>
        <div className={classes.row}>
          <TextField
            label="Travel time"
            value="10h 20min"
            disabled
          />
        </div>
      </Paper>
      <Paper className={`${classes.planDetailsCard} ${classes.nonMandatoryCard}`}>
        Friends
      </Paper>
    </div>
  );
};

export default PlanDetails;
