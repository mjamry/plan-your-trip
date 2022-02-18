/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';
import useLoggerService from '../Services/Diagnostics/LoggerService';

function DebugStateObserver() {
  const snapshot = useRecoilSnapshot();
  const logger = useLoggerService('RecoilState');

  useEffect(() => {
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      logger.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

export default DebugStateObserver;
