import useConsoleLog from './ConsoleLog'
import useDbLog from './DbLog'

const logLevel = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    debug: 'debug'
}

class Log{
    constructor(userId, timestamp, level, message, data = null){
        this.userId = userId;
        this.timestamp = timestamp;
        this.level = level;
        this.message = message;
        this.data = data ? JSON.stringify(data) : null
    }

    userId;
    timestamp;
    level;
    message;
    data;
}

const useLoggerService = () => {
    const loggers = [useConsoleLog(), useDbLog()]
    const userID = 0;

    var _generateLog = (level, message, data = null) => {
        return new Log(userID, new Date().toISOString(), level, message, data)
    }

    var error = (message, exception) => {
        var logEntry = _generateLog(logLevel.error, message, exception);

        loggers.forEach((logger)=>{
            logger.error(logEntry);
        })
    }

    var warning = (message) => {
        var logEntry = _generateLog(logLevel.warning, message);

        loggers.forEach((logger)=>{
            logger.warning(logEntry);
        })
    }

    var info = (message) => {
        var logEntry = _generateLog(logLevel.info, message);

        loggers.forEach((logger)=>{
            logger.info(logEntry);
        })
    }

    var debug = (message, data) => {  
        var logEntry = _generateLog(logLevel.debug, message, data);

        loggers.forEach((logger)=>{
            logger.debug(logEntry);
        })
    }

    return {
        error: error,
        warning: warning,
        info: info,
        debug: debug
    }
}

export default useLoggerService;