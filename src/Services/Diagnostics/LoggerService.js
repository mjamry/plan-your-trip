import useConsoleLog from './ConsoleLog'

const useLoggerService = () => {
    const loggers = [useConsoleLog()]

    var _generateLogMessageWithTimeStamp = (level, message) => {
        return `[${new Date().toISOString()}] [${level}] ${message}`;
    }

    var error = (message, exception) => {
        var logEntry = _generateLogMessageWithTimeStamp('ERR', message);

        loggers.forEach((logger)=>{
            logger.error(logEntry, exception);
        })
    }

    var warning = (message) => {
        var logEntry = _generateLogMessageWithTimeStamp('WAR', message);

        loggers.forEach((logger)=>{
            logger.warning(logEntry);
        })
    }

    var info = (message) => {
        var logEntry = _generateLogMessageWithTimeStamp('INF', message);

        loggers.forEach((logger)=>{
            logger.info(logEntry);
        })
    }

    var debug = (message, data) => {  
        var logEntry = _generateLogMessageWithTimeStamp('DBG', message);

        loggers.forEach((logger)=>{
            logger.debug(logEntry, data);
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