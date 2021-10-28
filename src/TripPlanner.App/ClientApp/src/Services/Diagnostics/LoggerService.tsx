import { Log, LogLevel } from '../../Common/Dto/Log';
import useConsoleLog from './ConsoleLog';
import useDbLog from './DbLog';

type ILoggerService = {
  error: (msg: string, ex: object) => void;
  warning: (msg: string) => void;
  info: (msg: string) => void;
  debug: (msg: string, data: object) => void;
}

const useLoggerService = (prefix: string): ILoggerService => {
  const loggers = [useConsoleLog(), useDbLog()];
  const userID = 0;

  const generateLog = (level: LogLevel, message: string, data?: object) => new Log(
    userID,
    new Date().toISOString(),
    level,
    prefix,
    message,
    data,
  );

  const error = (message: string, exception: object) => {
    const logEntry = generateLog(LogLevel.error, message, exception);

    loggers.forEach((logger) => {
      logger.error(logEntry);
    });
  };

  const warning = (message: string) => {
    const logEntry = generateLog(LogLevel.warning, message);

    loggers.forEach((logger) => {
      logger.warning(logEntry);
    });
  };

  const info = (message: string) => {
    const logEntry = generateLog(LogLevel.info, message);

    loggers.forEach((logger) => {
      logger.info(logEntry);
    });
  };

  const debug = (message: string, data: object) => {
    const logEntry = generateLog(LogLevel.debug, message, data);

    loggers.forEach((logger) => {
      logger.debug(logEntry);
    });
  };

  return {
    error,
    warning,
    info,
    debug,
  };
};

export default useLoggerService;
