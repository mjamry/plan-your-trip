import React from 'react';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { Avatar, AvatarGroup } from '@mui/material';
import useDateTimeFormatter from '../../Common/DateTimeFormatter';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: '0.15',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
    },
  },
  row: {
    marginTop: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      padding: '0.1rem',
    },
  },
  input: {
    width: '15.5rem',
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
  friendsDetails: {
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem',
    justifyContent: 'center',
  },
  nonMandatoryCard: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

// TODO move to separate file
function FriendComponent() {
  return (
    <AvatarGroup max={6}>
      <Avatar alt="Tom Tom" />
      <Avatar alt="Jimmy Smith" />
      <Avatar alt="Andy Baker" />
      <Avatar alt="Cindy Spark" />
      <Avatar alt="Terry McKinley" />
    </AvatarGroup>
  );
}

function PlanDetails() {
  const classes = useStyles();
  const dateTimeFormatter = useDateTimeFormatter();

  return (
    <div className={classes.container}>
      <Paper className={classes.planDetailsCard}>
        <div className={classes.row}>
          <TextField
            label="Plan name"
            value="Poland trip"
            className={classes.input}
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
            className={classes.input}
          />
        </div>
        <div className={classes.row}>
          <DesktopDatePicker
            label="End time"
            inputFormat="DD/MM/YYYY"
            value={dayjs().add(5, 'day')}
            // eslint-disable-next-line no-console
            onChange={(date) => console.log(date)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
            className={classes.input}
          />
        </div>
      </Paper>
      <Paper className={`${classes.planDetailsCard} ${classes.nonMandatoryCard}`}>
        <div className={classes.row}>
          <TextField
            label="Created"
            value={dateTimeFormatter.format(new Date('2021-01-01'))}
            className={classes.input}
            disabled
          />
        </div>
        <div className={classes.row}>
          <TextField
            label="Updated"
            value={dateTimeFormatter.format(new Date('2022-01-01'))}
            className={classes.input}
            disabled
          />
        </div>
        <div className={classes.row}>
          <TextField
            label="Distance"
            value="150km"
            className={classes.input}
            disabled
          />
        </div>
        <div className={classes.row}>
          <TextField
            label="Travel time"
            value="10h 20min"
            className={classes.input}
            disabled
          />
        </div>
      </Paper>
      <Paper className={`${classes.friendsDetails} ${classes.nonMandatoryCard}`}>
        <FriendComponent />
      </Paper>
    </div>
  );
}

export default PlanDetails;
