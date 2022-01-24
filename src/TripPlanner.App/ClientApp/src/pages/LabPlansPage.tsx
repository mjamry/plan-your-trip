import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Paper, Typography } from '@mui/material';
import Loader from '../components/Loader';

const useStyles = makeStyles({
  container: {
    height: '90vh',
    margin: '10px',
    overflow: 'auto',
  },
  gridCard: {
    padding: '10px',
  },
});
/* eslint-disable react/jsx-one-expression-per-line */
// TODO hardcoded values
const plans = [
  {
    id: 1,
    name: 'title',
    description: 'description',
    start: '20-05-2020',
    end: '25-06-2020',
    duration: 8,
    length: 111,
    stops: 6,
    // private
    // Shared
    // rating
    // finished
  },
  {
    id: 2,
    name: 'title',
    description: 'description',
    start: '20-05-2020',
    end: '25-06-2020',
    duration: 6,
    length: 200,
    stops: 22,
  },
  {
    id: 3,
    name: 'title',
    description: 'description',
    start: '20-05-2020',
    end: '25-06-2020',
    duration: 10,
    length: 120,
    stops: 12,
  },
];

const LabPlansPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const [isLoading] = useState(false);

  return (
    <div className={classes.container}>
      { isLoading
        ? <Loader />
        : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.gridCard}>
                <Typography variant="h6">
                  Welcome
                </Typography>
              </Paper>
            </Grid>
            { plans.map((plan) => (
              <Grid item xs={12} sm={6}>
                <Paper
                  className={classes.gridCard}
                  onClick={() => {
                    history.push(`/plans/${plan.id}`);
                  }}
                >
                  <Typography variant="h5">name: {plan.name} id: {plan.id}</Typography>
                  <Typography variant="h6">start time: {plan.start}</Typography>
                  <Typography variant="h6">end time: {plan.end}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
    </div>
  );
};

export default LabPlansPage;
