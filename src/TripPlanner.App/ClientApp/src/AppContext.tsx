import React from 'react';
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

const AppContext = ({ children }: Props) => (
  <NotificationStateProvider>
    <ToasterNotificationsComponent />
    <AppStateProvider>
      <UserStateProvider>
        <LocationsStateProvider>
          <ListsStateProvider>
            <ModalStateProvider>
              {children}
            </ModalStateProvider>
          </ListsStateProvider>
        </LocationsStateProvider>
      </UserStateProvider>
    </AppStateProvider>
  </NotificationStateProvider>
);

export default AppContext;
