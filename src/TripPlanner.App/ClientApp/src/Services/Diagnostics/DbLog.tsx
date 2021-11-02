import { Log } from '../../Common/Dto/Log';

const storeLog = async (log: Log) => {
  const url = 'http://localhost:50001/diagnostics/logs/create';

  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(log),
  });
};

const useDbLog = () => {
  const error = (logEntry: Log) => {
    storeLog(logEntry);
  };

  const warning = (logEntry: Log) => {
    storeLog(logEntry);
  };

  const info = () => {
    // for now store only error and warning
    // storelog(logEntry);
  };

  const debug = () => {
    // for now store only error and warning
    // storelog(logEntry);
  };

  return {
    error,
    warning,
    info,
    debug,
  };
};

export default useDbLog;
