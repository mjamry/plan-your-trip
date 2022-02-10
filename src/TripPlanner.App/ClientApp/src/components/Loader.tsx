import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

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

function Loader(props: Props) {
  const classes = useStyles();
  const { title } = props;

  return (
    <div className={classes.loader}>
      <CircularProgress />
      <Typography variant="h6">{title || 'Loading'}</Typography>
    </div>
  );
}

export default Loader;
