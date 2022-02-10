const DefaultNotificationTimeout = 2000;

const enum NotificationType {
    error = 'error',
    success = 'success',
    info = 'info',
}

class Notification {
  constructor(type: NotificationType, content: string, timeout: number) {
    this.type = type;
    this.content = content;
    this.id = (+new Date()).toString(32);
    this.timeout = timeout;
  }

  type: NotificationType;

  content: string;

  timeout: number;

  id: string;
}

export { DefaultNotificationTimeout, Notification, NotificationType };
