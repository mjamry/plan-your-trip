import React from 'react';
import { NotificationStateProvider } from './State/NotificationState';
import { ModalStateProvider } from './State/ModalStateProvider';
import ToasterNotifications from './components/ToasterNotifications';
import { AppStateProvider } from './State/AppState';
import { LocationsStateProvider } from './State/LocationsState';
import { ListsStateProvider } from './State/ListsState';

type Props = {
  children: JSX.Element
}

const AppContext = ({ children }: Props) => (
  <NotificationStateProvider>
    <ToasterNotifications />
    <AppStateProvider>
      <LocationsStateProvider>
        <ListsStateProvider>
          <ModalStateProvider>
            {children}
          </ModalStateProvider>
        </ListsStateProvider>
      </LocationsStateProvider>
    </AppStateProvider>
  </NotificationStateProvider>
);

export default AppContext;
