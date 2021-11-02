import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';
import MainMenu from '../components/MainMenu';
import Header from '../components/Header';

const useStyles = makeStyles({
  content: {
    marginLeft: '180px',
  },
});

type Props = {
  children: JSX.Element[]
}

const PageLayout = (props: Props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <>
      <Header />
      <Toolbar />
      <MainMenu />
      <div className={classes.content}>
        {children}
      </div>
    </>
  );
};

export default PageLayout;
