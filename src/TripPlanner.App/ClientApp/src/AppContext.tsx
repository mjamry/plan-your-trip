import React from 'react';
import {
  ThemeProvider, Theme, StyledEngineProvider, createTheme, responsiveFontSizes,
} from '@mui/material/styles';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { RecoilRoot } from 'recoil';
import { NotificationStateProvider } from './State/NotificationState';
import { ModalStateProvider } from './State/ModalState';
import ToasterNotificationsComponent from './components/ToasterNotifications';
import { LocationsStateProvider } from './State/LocationsState';
import { PlansStateProvider } from './State/PlansState';
import { UserStateProvider } from './State/UserState';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

type Props = {
  children: JSX.Element
}

let theme = createTheme();
theme = responsiveFontSizes(theme);

function AppContext({ children }: Props) {
  return (
    <NotificationStateProvider>
      <ToasterNotificationsComponent />
      <RecoilRoot>
        <UserStateProvider>
          <LocationsStateProvider>
            <PlansStateProvider>
              <ModalStateProvider>
                <StyledEngineProvider injectFirst>
                  <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                      {children}
                    </LocalizationProvider>
                  </ThemeProvider>
                </StyledEngineProvider>
              </ModalStateProvider>
            </PlansStateProvider>
          </LocationsStateProvider>
        </UserStateProvider>
      </RecoilRoot>
    </NotificationStateProvider>
  );
}

export default AppContext;
