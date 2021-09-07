import { AppStateActions, useAppState } from '../State/AppState';
import useRestClient from '../Common/RestClient';
import useLoggerService from './Diagnostics/LoggerService';

import defaultSettings from '../assets/settings.json';
import { AppSettings } from '../Common/Dto/AppSettings';

const SettingsUrl = '/api/settings';

interface IAppSettingsService {
  init: () => Promise<void>;
}

const useAppSettingsService = (): IAppSettingsService => {
  const logger = useLoggerService('AppSettingsService');
  const { dispatch } = useAppState();

  const api = useRestClient(
    {
      authenticate: false,
    },
  );

  const getSettings = (settings: AppSettings) => {
    const setts = {
      apiUrl: settings.apiUrl || defaultSettings.apiUrl,
      authUrl: settings.authUrl || defaultSettings.authUrl,
      appUrl: settings.appUrl || defaultSettings.appUrl,
    };

    return setts;
  };

  const init = async () => new Promise<void>((resolve, reject) => {
    api.get(SettingsUrl)
      .then((settings) => {
        dispatch({
          type: AppStateActions.setAppSettings,
          data: getSettings(settings),
        });

        resolve();
      })
      .catch((err) => {
        // TODO - ensure that app do not freeze here
        logger.error('Cannot get app settings', err);
        reject();
      });
  });

  return {
    init,
  };
};

export default useAppSettingsService;
