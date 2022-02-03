import {
  Button, Paper, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { ReactComponent as Error401 } from '../assets/images/401.svg';
import { ReactComponent as Error404 } from '../assets/images/404.svg';
import { ReactComponent as GeneralError } from '../assets/images/error.svg';

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

type MatchParams = {
  code: string
}

type ErrorDetails = {
  title: string,
  content: JSX.Element,
}

interface Props extends RouteComponentProps<MatchParams> {}

const ErrorPage = ({ match }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const errorCode = +match.params.code;

  const getError = (code: number): ErrorDetails => {
    switch (code) {
      case 401:
        return {
          title: 'Sorry, you do not have an access.',
          content: <Error401 className={classes.image} />,
        };
      case 404: {
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
        {getError(errorCode).content}
        <Typography variant="h6">
          {getError(errorCode).title}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => history.push('/')}
        >
          Go Back
        </Button>
      </Paper>
    </div>
  );
};

export default ErrorPage;