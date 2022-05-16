import React from 'react';
import {
  ThemeProvider, Theme, StyledEngineProvider, createTheme, responsiveFontSizes,
} from '@mui/material/styles';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { useRecoilValue } from 'recoil';
import ToasterNotificationsComponent from '../components/ToasterNotifications';
import DebugStateObserver from '../State/DebugStateObserver';
import { appSettingsState, isAppLoadedState, isUserSignedInState } from '../State/AppState';
import AuthenticatedApp from './AuthenticatedApp';
import AppLoader from './AppLoader';
import LocationActionLoadingIndicator from '../components/LocationActionLoadingIndicator';
import ModalContainer from '../components/modals/ModalContainer';
import UnauthenticatedApp from './UnauthenticatedApp';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {
  const appSettings = useRecoilValue(appSettingsState);
  const isAppLoaded = useRecoilValue(isAppLoadedState);
  const isUserLoaded = useRecoilValue(isUserSignedInState);

  const render = () => {
    if (isAppLoaded) {
      if (isUserLoaded) {
        return <AuthenticatedApp />;
      }
      return <UnauthenticatedApp />;
    }

    return <AppLoader />;
  };

  return (
    <>
      { appSettings.isDevelopment && <DebugStateObserver /> }
      <ToasterNotificationsComponent />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LocationActionLoadingIndicator />
          <ModalContainer />
          <LocalizationProvider dateAdapter={DateAdapter}>
            { render() }
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
