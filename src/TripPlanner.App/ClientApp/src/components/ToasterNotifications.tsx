import React, { useEffect, useState } from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useLoggerService from '../Services/Diagnostics/LoggerService';
import { Notification, NotificationType } from '../Common/Dto/Notification';
import { hideNotificationState, notificationsState } from '../State/NotificationsState';

type NotificationItemProps = {
  type: NotificationType,
  icon: JSX.Element,
  title: string,
  content: string,
  timeout: number,
  onClose: () => void
}

function ToasterNotificationItem(props: NotificationItemProps) {
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
        {icon}
      </div>
      <div className="toaster-notification-item-body">
        <div className="toaster-notification-item-title">{title}</div>
        <div className="toaster-notification-item-content">{content}</div>
      </div>
    </div>
  );
}

type NotificationProps = {
  message: string;
  timeout: number;
  onClose: () => void;
}

function ToasterNotificationError({ message, timeout, onClose }: NotificationProps) {
  return (
    <ToasterNotificationItem
      title="Error"
      type={NotificationType.error}
      icon={<PriorityHighIcon />}
      content={message}
      timeout={timeout}
      onClose={onClose}
    />
  );
}

function ToasterNotificationSuccess({ message, timeout, onClose }: NotificationProps) {
  return (
    <ToasterNotificationItem
      title="Success"
      type={NotificationType.info}
      icon={<CheckIcon />}
      content={message}
      timeout={timeout}
      onClose={onClose}
    />
  );
}

function CreateToasterNotification(notification: Notification, onClose: () => void) {
  const { type, content, timeout } = notification;
  const logger = useLoggerService('ToasterNotification');

  switch (type) {
    case NotificationType.info:
    case NotificationType.success:
      return (
        <ToasterNotificationSuccess
          message={content}
          timeout={timeout}
          onClose={onClose}
        />
      );
    case NotificationType.error:
      return (
        <ToasterNotificationError
          message={content}
          timeout={timeout}
          onClose={onClose}
        />
      );
    default:
      logger.debug(`Incorrect notification type: "${type}".`);
      return <></>;
  }
}

function ToasterNotificationsComponent() {
  const hideNotification = useSetRecoilState(hideNotificationState);
  const notifications = useRecoilValue(notificationsState);

  const renderNotifications = () => {
    const output = notifications.map((notification) => (
      <div key={notification.id}>
        {
          CreateToasterNotification(
            notification,
            () => hideNotification([notification]),
          )
        }
      </div>
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
}

export default ToasterNotificationsComponent;
