import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Paper, Typography } from '@mui/material';
import Loader from '../components/Loader';
import usePlanService from '../Services/PlanService';
import { usePlansState } from '../State/PlansState';
import useDateTimeFormatter from '../Common/DateTimeFormatter';

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

function LabPlansPage() {
  const history = useHistory();
  const classes = useStyles();
  const planService = usePlanService();
  const { state } = usePlansState();
  const dateTimeFormatter = useDateTimeFormatter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlanData = async () => {
      setIsLoading(true);
      await planService.getAll();
      setIsLoading(false);
    };

    fetchPlanData();
  }, []);

  const handlePlanSelect = (planId: number) => {
    history.push(`/plans/${planId}`);
  };

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
            { state.plans.map((plan) => (
              <Grid item xs={12} sm={6}>
                <Paper
                  className={classes.gridCard}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  <Typography variant="h5">
                    name:
                    {' '}
                    {plan.name}
                    {' '}
                    id:
                    {' '}
                    {plan.id}
                  </Typography>
                  <Typography variant="h6">
                    start time:
                    {' '}
                    {dateTimeFormatter.format(plan.created)}
                  </Typography>
                  <Typography variant="h6">
                    end time:
                    {' '}
                    {dateTimeFormatter.format(plan.updated)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
    </div>
  );
}

export default LabPlansPage;
