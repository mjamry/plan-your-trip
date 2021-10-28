import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  loader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
});

type Props = {
  title?: string;
}

const Loader = (props: Props) => {
  const classes = useStyles();
  const { title } = props;

  return (
    <div className={classes.loader}>
      <CircularProgress />
      <Typography variant="h6">{title || 'Loading'}</Typography>
    </div>
  );
};

export default Loader;
