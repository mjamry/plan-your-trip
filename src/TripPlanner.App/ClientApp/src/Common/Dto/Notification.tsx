const DefaultNotificationTimeout = 2000;

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
    timeout: number = DefaultNotificationTimeout,
    id: string = (+new Date()).toString(32),
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
  DefaultNotificationTimeout, Notification, NotificationType,
};
