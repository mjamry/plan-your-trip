import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ToasterNotifications = () => {
    return (
        <div className="toaster-notifications-container">
            <div className="toaster-notifications-box">
                <ToasterNotificationError message="Something went wrong"/>
                <ToasterNotificationSuccess />
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