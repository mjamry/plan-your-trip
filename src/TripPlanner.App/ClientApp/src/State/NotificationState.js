import React, {createContext, useContext, useReducer} from 'react'
import {Notification, DefaultNotificationTimeout} from '../Services/Notification'
import useLoggerService from '../Services/Diagnostics/LoggerService'

const NotificationTypes = {
    error: 'error',
    success: 'success',
    info: 'info'
}

const NotificationsActions = {
    show: 'show',
    hide: 'hide'
}

const NotificationsState = {
    notifications: [{type: "", content: ""}]
}

const NotificationStateContext = createContext();

const NotificationStateProvider = ({children}) => {
    return (
        <NotificationStateContext.Provider value={useReducer(_reducer, NotificationsState)}>
            {children}
        </NotificationStateContext.Provider>
    )
}

var useNotificationState = () => useContext(NotificationStateContext);

const _reducer = (state, action) => {
    var logger = useLoggerService();
    switch(action.type){
        case NotificationsActions.show:
            state = {...state, notifications: [...state.notifications, new Notification(action.notificationType, action.data, DefaultNotificationTimeout)]}
            break;
        case NotificationsActions.hide:
            var updatedNotifications = state.notifications.filter(n => n.id !== action.data) || [];
            state = {...state, notifications: updatedNotifications}
            break;
        default:
            logger.debug(`[NotificationsState] Action: "${action.type}" not correct.`);
    }

    return state;
}

export default NotificationStateProvider;
export {NotificationStateContext as NotificationContext, NotificationTypes, NotificationsActions, useNotificationState}