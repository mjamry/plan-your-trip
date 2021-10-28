import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import MainMenu from '../components/MainMenu';
import AppContent from '../components/AppContent';
import Header from '../components/Header';

type Props = {
  children: JSX.Element[]
}

const PageLayout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <Toolbar />
      <MainMenu />
      <AppContent>
        {children}
      </AppContent>
    </>
  );
};

export default PageLayout;
