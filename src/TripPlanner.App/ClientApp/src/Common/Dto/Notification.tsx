import { v4 as uuid } from 'uuid';

const DefaultNotificationTimeoutInMs = 200000;

const enum NotificationType {
    error = 'error',
    success = 'success',
    info = 'info',
    none = 'none',
}

class Notification {
  constructor(
    type: NotificationType,
    content: string,
    timeout: number = DefaultNotificationTimeoutInMs,
    id: string = uuid(),
  ) {
    this.type = type;
    this.content = content;
    this.id = id;
    this.timeout = timeout;
  }

  type: NotificationType;

  content: string;

  timeout: number;

  id: string;
}

export {
  DefaultNotificationTimeoutInMs as DefaultNotificationTimeout, Notification, NotificationType,
};
