import React, {createContext, useContext, useReducer} from 'react'

export {NotificationStateContext as NotificationContext, NotificationStateProvider, NotificationTypes, NotificationsActions, useNotificationState}

const Notification = (type, content) => {
    


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
            state = {...state, notifications: [...state.notifications, {type: action.notificationType, content: action.data}]}
            return state;
        case NotificationsActions.hide:
            console.log(`hide ${action.data}`);
            return state;
        default:
            console.info(`[NotificationsState] Action: "${action.type}" not correct.`);
    }

    return state;
}

export default NotificationStateProvider;