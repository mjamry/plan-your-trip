import React from 'react';
import {
  ThemeProvider, Theme, StyledEngineProvider, createTheme, responsiveFontSizes,
} from '@mui/material/styles';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { useRecoilValue } from 'recoil';
import ToasterNotificationsComponent from './components/ToasterNotifications';
import DebugStateObserver from './State/DebugStateObserver';
import { isAppLoadedState } from './State/AppState';
import App from './App';
import AppLoader from './AppLoader';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

let theme = createTheme();
theme = responsiveFontSizes(theme);

function AppContent() {
  const isAppLoaded = useRecoilValue(isAppLoadedState);

  return (
    <>
      <DebugStateObserver />
      <ToasterNotificationsComponent />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            {isAppLoaded ? <App /> : <AppLoader />}
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>

  );
}

export default AppContent;
