import { useSetRecoilState } from 'recoil';
import useRestClient from '../Common/RestClient';
import useLoggerService from './Diagnostics/LoggerService';

import defaultSettings from '../assets/settings.json';
import { AppSettings } from '../Common/Dto/AppSettings';
import { appSettingsState } from '../State/AppState';

const SettingsUrl = '/api/settings';

interface IAppSettingsService {
  init: () => Promise<AppSettings>;
}

const useAppSettingsService = (): IAppSettingsService => {
  const logger = useLoggerService('AppSettingsService');

  const setAppSettings = useSetRecoilState(appSettingsState);

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
      storageUrl: settings.storageUrl || defaultSettings.storageUrl,
      storageContainerName: settings.storageContainerName || defaultSettings.storageContainerName,
      storageToken: settings.storageToken || defaultSettings.storageToken,
    };

    return setts;
  };

  const init = async () => new Promise<AppSettings>((resolve, reject) => {
    api.get<AppSettings>(SettingsUrl)
      .then((settings) => {
        setAppSettings(getSettings(settings));

        resolve(settings);
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
