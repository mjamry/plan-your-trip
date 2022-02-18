import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Loader from '../components/Loader';
import usePlanService from '../Services/PlanService';
import useDateTimeFormatter from '../Common/DateTimeFormatter';
import { plansState } from '../State/PlansState';

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
  const navigate = useNavigate();
  const classes = useStyles();
  const planService = usePlanService();
  const dateTimeFormatter = useDateTimeFormatter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const plans = useRecoilValue(plansState);

  useEffect(() => {
    const fetchPlanData = async () => {
      setIsLoading(true);
      await planService.getAll();
      setIsLoading(false);
    };

    fetchPlanData();
  }, []);

  const handlePlanSelect = (planId: number) => {
    navigate(`/plans/${planId}`);
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
            { plans.map((plan) => (
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
