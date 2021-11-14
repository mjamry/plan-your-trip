import React from 'react';
import {
  ThemeProvider, Theme, StyledEngineProvider, createTheme,
} from '@mui/material/styles';
import { NotificationStateProvider } from './State/NotificationState';
import { ModalStateProvider } from './State/ModalState';
import ToasterNotificationsComponent from './components/ToasterNotifications';
import { AppStateProvider } from './State/AppState';
import { LocationsStateProvider } from './State/LocationsState';
import { ListsStateProvider } from './State/ListsState';
import { UserStateProvider } from './State/UserState';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

type Props = {
  children: JSX.Element
}

const theme = createTheme();

const AppContext = ({ children }: Props) => (
  <NotificationStateProvider>
    <ToasterNotificationsComponent />
    <AppStateProvider>
      <UserStateProvider>
        <LocationsStateProvider>
          <ListsStateProvider>
            <ModalStateProvider>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                  {children}
                </ThemeProvider>
              </StyledEngineProvider>
            </ModalStateProvider>
          </ListsStateProvider>
        </LocationsStateProvider>
      </UserStateProvider>
    </AppStateProvider>
  </NotificationStateProvider>
);

export default AppContext;
