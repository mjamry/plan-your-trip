import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {useNotificationState, NotificationTypes} from './../State/NotificationState'

const CreateToasterNotification = (type, content) => {
    switch(type){
        case NotificationTypes.info:
        case NotificationTypes.success:
            return <ToasterNotificationSuccess message={content} />
        case NotificationTypes.error:
            return <ToasterNotificationError message={content} />
    }
    
}

const ToasterNotifications = () => {
    const [{notifications}, dispatchNotifications] = useNotificationState();

    var renderNotifications = () => {
        var output = notifications.map((notification) => (
            CreateToasterNotification(notification.type, notification.content)
        ));

        return output;
    }

    return (
        <div className="toaster-notifications-container">
            <div className="toaster-notifications-box">
                {renderNotifications()}
            </div>
        </div>
    )
}

const ToasterNotificationItem = ({type, title, content, icon}) => {
    return <div className={`toaster-notification-item toaster-notification-item-${type}`}>
        <div className="toaster-notification-item-icon">
            <FontAwesomeIcon icon={icon} className="fa-2x"/>
        </div>
        <div className="toaster-notification-item-body">
            <div className="toaster-notification-item-title">{title}</div>
            <div className="toaster-notification-item-content">{content}</div>
        </div>
    </div>
}

const ToasterNotificationError = ({message}) => {

    return (<ToasterNotificationItem title="Error" type="error" icon="exclamation" content={message}/>);
                
}

const ToasterNotificationSuccess = ({message}) => {
                
    return (<ToasterNotificationItem title="Success" type="info" content="test content" icon="check" content={message}/>);
}

export default ToasterNotifications;