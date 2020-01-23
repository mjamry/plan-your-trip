import React, {createContext, useContext, useReducer} from 'react'

export {NotificationStateContext as NotificationContext, NotificationStateProvider, NotificationTypes, NotificationsActions, useNotificationState, Notification}

const DefaultNotificationTimeout = 2000;

class Notification {
    constructor(type, content, timeout){
        this.type = type;
        this.content = content;
        this.id = (+new Date()).toString(32);
        this.timeout = timeout;
    }
    type;
    content;
    timeout;
    id;
}

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
    switch(action.type){
        case NotificationsActions.show:
            state = {...state, notifications: [...state.notifications, new Notification(action.notificationType, action.data, DefaultNotificationTimeout)]}
            break;
        case NotificationsActions.hide:
            var updatedNotifications = state.notifications.filter(n => n.id !== action.data) || [];
            state = {...state, notifications: updatedNotifications}
            break;
        default:
            console.info(`[NotificationsState] Action: "${action.type}" not correct.`);
    }

    return state;
}

export default NotificationStateProvider;