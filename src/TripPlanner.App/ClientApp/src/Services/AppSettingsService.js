import { AppStateActions, useAppState } from '../State/AppState'
import useRestClient from './../Common/RestClient'
import useLoggerService from './../Services/Diagnostics/LoggerService'

import defaultSettings from './../assets/settings.json';
const SettingsUrl = '/api/settings';

const useAppSettingsService = () => {
    const logger = useLoggerService('AppSettingsService');
    const [appState, dispatchAppState] = useAppState(null);

    const api = useRestClient(
        {
            authenticate: false
        });


    const init = async() => {
        return new Promise((resolve, reject) => {
            api.get(SettingsUrl)
            .then((settings) => {
                dispatchAppState(
                    {
                        type: AppStateActions.setAppSettings,
                        data: getSettings(settings),
                    })
                resolve();
            })
            .catch((err) =>{
                //TODO - do something here to ensure that app will not freez on loading part - show toaster with error ?
                logger.error("Cannot get app settings", err);
                reject();
            });
        })
    }

    const getSettings = (settings) => {
        let setts = {
            apiUrl: settings.apiUrl || defaultSettings.apiUrl,
            authUrl: settings.authUrl || defaultSettings.authUrl,
            appUrl: settings.appUrl || defaultSettings.appUrl
        };

        return setts;
    }

    return {
        init: init
    }
}

export default useAppSettingsService;