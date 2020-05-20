
import React from 'react'
import NotificationStateProvider from './State/NotificationState'
import { ModalStateProvider } from './State/ModalStateProvider'
import ToasterNotifications from './components/ToasterNotifications'
import UserStateProvider from './State/UserState'
import { LocationsStateProvider } from './State/LocationsState'
import ListsStateProvider from './State/ListsState'

const AppContext = ({ children }) => {
    return (
        <NotificationStateProvider>
        <ToasterNotifications/>
        <UserStateProvider>
        <LocationsStateProvider>
        <ListsStateProvider>
        <ModalStateProvider>
            {children}
        </ModalStateProvider>
        </ListsStateProvider>
        </LocationsStateProvider>
        </UserStateProvider>
        </NotificationStateProvider>
    )
}

export default AppContext;