
const styles = {
    error: 'background: red; color white;font-size: 12pt',
    warning: "background: yellow; color: black; font-size: 11pt;display: block",
    info: 'background: white; color: black',
    debug: 'background: coral; color: black'
}

const useConsoleLog = () => {
    var _log = (message, style) => {
        console.log(`%c${message}`, style);
    }

    var error = (message, ex) => {
        console.groupCollapsed(`%c${message}`, styles.error);
        if(ex){
            console.log(ex)
        }
        console.trace();
        console.groupEnd();
    }

    var warning = (message) => {
        console.groupCollapsed(`%c${message}`, styles.warning);
        console.trace();
        console.groupEnd();
    }

    var info = (message) => {
        _log(message, styles.info);
    }

    var debug = (message, data) => {  
        if(data){
            console.groupCollapsed(`%c${message}`, styles.debug);
            console.log(data);
            console.groupEnd();
        }
        else{
            _log(message, styles.debug);
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