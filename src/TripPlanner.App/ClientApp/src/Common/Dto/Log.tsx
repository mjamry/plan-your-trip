enum LogLevel {
  error = 'error',
  warning = 'warning',
  info = 'info',
  debug = 'debug'
}

class Log {
  constructor(
    userId: number,
    timestamp: string,
    level: LogLevel,
    prefix: string = '',
    message: string,
    data?: object,
  ) {
    this.userId = userId;
    this.timestamp = timestamp;
    this.level = level;
    this.message = message;
    this.prefix = prefix;
    this.data = data ? JSON.stringify(data) : null;
  }

  userId;

  timestamp;

  level;

  message;

  prefix;

  data;
}

export { Log, LogLevel };
