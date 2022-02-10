import {
  Button, Paper, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Error401 } from '../assets/images/401.svg';
import { ReactComponent as Error404 } from '../assets/images/404.svg';
import { ReactComponent as GeneralError } from '../assets/images/error.svg';
import RouteTypes from '../Common/RouteTypes';

const useStyles = makeStyles({
  root: {
    height: '90vh',
    width: '90vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridCard: {
    padding: '1em',
    width: '40vw',
  },
  button: {
    margin: '1em',
  },
  image: {
    maxHeight: '45vh',
    maxWidth: '45vh',
  },
});

type RouteParams = {
  errorCode: string
}

type ErrorDetails = {
  title: string,
  content: JSX.Element,
}

function ErrorPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { errorCode } = useParams<RouteParams>();

  const getError = (code: string): ErrorDetails => {
    switch (code) {
      case '401':
        return {
          title: 'Sorry, you do not have an access.',
          content: <Error401 className={classes.image} />,
        };
      case '404': {
        return {
          title: 'Sorry, page not found.',
          content: <Error404 className={classes.image} />,
        };
      }
      default:
        return {
          title: 'Sorry, something went wrong.',
          content: <GeneralError className={classes.image} />,
        };
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.gridCard}>
        {getError(errorCode!).content}
        <Typography variant="h6">
          {getError(errorCode!).title}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => navigate(RouteTypes.error)}
        >
          Go Back
        </Button>
      </Paper>
    </div>
  );
}

export default ErrorPage;
