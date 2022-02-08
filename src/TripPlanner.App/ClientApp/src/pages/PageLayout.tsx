import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import MainMenu from '../components/MainMenu';
import Header from '../components/Header';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    paddingTop: '4rem',
    boxSizing: 'border-box',
  },
  menu: {
  },
  content: {
    flexGrow: 1,
  },
});

type Props = {
  children: JSX.Element[]
}

function PageLayout(props: Props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.page}>
        <div className={classes.menu}>
          <MainMenu />
        </div>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </>
  );
}

export default PageLayout;
