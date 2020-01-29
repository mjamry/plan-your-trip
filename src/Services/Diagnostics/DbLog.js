
const useDbLog = () => {
    var error = (logEntry) => {
        storelog(logEntry);
    }

    var warning = (logEntry) => {
        storelog(logEntry);
    }

    var info = (logEntry) => {
        //for now store only error and warning
        //storelog(logEntry);
    }

    var debug = (logEntry) => {  
        //for now store only error and warning
        //storelog(logEntry);
    }

    return {
        error: error,
        warning: warning,
        info: info,
        debug: debug
    }
}

export default useDbLog;

const storelog = async (log) => {
    let url = 'http://localhost:5000/diagnostics/logs/create';

    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(log)
    });

    console.log(rawResponse)
    console.log(log)
}