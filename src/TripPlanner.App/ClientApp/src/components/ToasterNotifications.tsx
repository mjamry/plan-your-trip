import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import useLoggerService from '../Services/Diagnostics/LoggerService';
import { Notification, NotificationType } from '../Common/Dto/Notification';
import { useNotificationState, NotificationsActions } from '../State/NotificationState';

type NotificationItemProps = {
  type: NotificationType,
  icon: IconProp,
  title: string,
  content: string,
  timeout: number,
  onClose: () => void
}

const ToasterNotificationItem = (props: NotificationItemProps) => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const {
    icon, type, title, content, timeout, onClose,
  } = props;

  const startTimer = () => {
    setTimer(setTimeout(onClose, timeout));
  };

  const stopTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <div
      className={`toaster-notification-item toaster-notification-item-${type}`}
      role="button"
      tabIndex={-1}
      onClick={onClose}
      onKeyPress={onClose}
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      <div className="toaster-notification-item-icon">
        <FontAwesomeIcon icon={icon} className="fa-2x" />
      </div>
      <div className="toaster-notification-item-body">
        <div className="toaster-notification-item-title">{title}</div>
        <div className="toaster-notification-item-content">{content}</div>
      </div>
    </div>
  );
};

type NotificationProps = {
  message: string;
  timeout: number;
  onClose: () => void;
}

const ToasterNotificationError = ({ message, timeout, onClose }: NotificationProps) => (
  <ToasterNotificationItem
    title="Error"
    type={NotificationType.error}
    icon="exclamation"
    content={message}
    timeout={timeout}
    onClose={onClose}
  />
);

const ToasterNotificationSuccess = ({ message, timeout, onClose }: NotificationProps) => (
  <ToasterNotificationItem
    title="Success"
    type={NotificationType.info}
    icon="check"
    content={message}
    timeout={timeout}
    onClose={onClose}
  />
);

const CreateToasterNotification = (notification: Notification, onClose: () => void) => {
  const logger = useLoggerService("ToasterNotification");

  switch (notification.type) {
    case NotificationType.info:
    case NotificationType.success:
      return (
        <ToasterNotificationSuccess
          message={notification.content}
          timeout={notification.timeout}
          onClose={onClose}
        />
      );
    case NotificationType.error:
      return (
        <ToasterNotificationError
          message={notification.content}
          timeout={notification.timeout}
          onClose={onClose}
        />
      );
    default:
      logger.debug(`Incorrect notification type: "${notification.type}".`);
      return <></>;
  }
};

const ToasterNotificationsComponent = () => {
  const { state, dispatch } = useNotificationState();

  const renderNotifications = () => {
    const output = state.notifications.map((notification) => (
      CreateToasterNotification(
        notification,
        () => { dispatch({ type: NotificationsActions.hide, data: notification.id }); },
      )
    ));

    return output;
  };

  return (
    <div className="toaster-notifications-container">
      <div className="toaster-notifications-box">
        {renderNotifications()}
      </div>
    </div>
  );
};

export default ToasterNotificationsComponent;
