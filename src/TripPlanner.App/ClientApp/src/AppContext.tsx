import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { NotificationStateProvider } from './State/NotificationState';
import { ModalStateProvider } from './State/ModalState';
import ToasterNotificationsComponent from './components/ToasterNotifications';
import { AppStateProvider } from './State/AppState';
import { LocationsStateProvider } from './State/LocationsState';
import { ListsStateProvider } from './State/ListsState';
import { UserStateProvider } from './State/UserState';

type Props = {
  children: JSX.Element
}

const theme = createMuiTheme();

const AppContext = ({ children }: Props) => (
  <NotificationStateProvider>
    <ToasterNotificationsComponent />
    <AppStateProvider>
      <UserStateProvider>
        <LocationsStateProvider>
          <ListsStateProvider>
            <ModalStateProvider>
              <ThemeProvider theme={theme}>
                {children}
              </ThemeProvider>
            </ModalStateProvider>
          </ListsStateProvider>
        </LocationsStateProvider>
      </UserStateProvider>
    </AppStateProvider>
  </NotificationStateProvider>
);

export default AppContext;
