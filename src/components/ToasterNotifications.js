import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {useNotificationState, NotificationTypes, NotificationsActions} from './../State/NotificationState'

const CreateToasterNotification = (notification, onClose) => {
    switch(notification.type){
        case NotificationTypes.info:
        case NotificationTypes.success:
            return <ToasterNotificationSuccess message={notification.content} timeout={notification.timeout} onClose={onClose}/>
        case NotificationTypes.error:
            return <ToasterNotificationError message={notification.content} timeout={notification.timeout} onClose={onClose}/>
        default: 
            console.info(`[ToasterNotification] Incorrect notification type: "${notification.type}".`);
    }
    
}

const ToasterNotifications = () => {
    const [{notifications}, dispatchNotifications] = useNotificationState();

    var renderNotifications = () => {
        var output = notifications.map((notification) => (
            CreateToasterNotification(
                notification, 
                ()=>{dispatchNotifications({type: NotificationsActions.hide, data: notification.id})}
            )
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

const ToasterNotificationItem = ({type, title, content, icon, timeout, onClose}) => {
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        startTimer()
    }, [])
    

    var startTimer = () => {
        setTimer(setTimeout(onClose, timeout));
    }

    var stopTimer = () => {
        clearTimeout(timer);
    }

    return <div 
                className={`toaster-notification-item toaster-notification-item-${type}`} 
                onClick={()=>onClose()}
                onMouseEnter={()=>stopTimer()}
                onMouseLeave={()=>startTimer()}
                >
        <div className="toaster-notification-item-icon">
            <FontAwesomeIcon icon={icon} className="fa-2x"/>
        </div>
        <div className="toaster-notification-item-body">
            <div className="toaster-notification-item-title">{title}</div>
            <div className="toaster-notification-item-content">{content}</div>
        </div>
    </div>
}

const ToasterNotificationError = ({message, timeout, onClose}) => {
    return (<ToasterNotificationItem title="Error" type="error" icon="exclamation" content={message} timeout={timeout} onClose={onClose}/>);
                
}

const ToasterNotificationSuccess = ({message,timeout, onClose}) => {
    return (<ToasterNotificationItem title="Success" type="info" icon="check" content={message} timeout={timeout} onClose={onClose}/>);
}

export default ToasterNotifications;