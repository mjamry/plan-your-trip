
const styles = {
    error: 'background: red; color white;font-size: 12pt',
    warning: "background: yellow; color: black; font-size: 11pt;display: block",
    info: 'background: white; color: black',
    debug: 'background: coral; color: black'
}

const useConsoleLog = () => {
    var _logContent = (logEntry) => {
        return `%c[${logEntry.timestamp}][${logEntry.level}] ${logEntry.message}`
    }

    var error = (logEntry) => {
        console.groupCollapsed(_logContent(logEntry), styles.error);
        if(logEntry.data){
            console.log(logEntry.data)
        }
        console.trace();
        console.groupEnd();
    }

    var warning = (logEntry) => {
        console.groupCollapsed(_logContent(logEntry), styles.warning);
        console.trace();
        console.groupEnd();
    }

    var info = (logEntry) => {
        console.log(_logContent(logEntry), styles.info);
    }

    var debug = (logEntry) => {  
        if(logEntry.data){
            console.groupCollapsed(_logContent(logEntry), styles.debug);
            console.log(logEntry.data);
            console.groupEnd();
        }
        else{
            console.log(_logContent(logEntry), styles.debug);
        }
    }

    return {
        error: error,
        warning: warning,
        info: info,
        debug: debug
    }
}

export default useConsoleLog;