import { AppStateActions, useAppState } from '../State/AppState'
import useRestClient from './../Common/RestClient'
import useLoggerService from './../Services/Diagnostics/LoggerService'

import defaultSettings from './../assets/settings.json';
const SettingsUrl = '/api/settings';

const useAppSettingsService = () => {
    const logger = useLoggerService('AppSettingsService');

    const api = useRestClient(
        {
            authenticate: false
        });

    const [appState, dispatchAppState] = useAppState(null);

    const init = async() => {
        await api.get(SettingsUrl)
            .then((settings) => {
                dispatchAppState(
                    {
                        type: AppStateActions.setAppSettings,
                        data: getSettings(settings),
                    })
        })
        .catch((err) =>{
            logger.error("Cannot get app settings", err)
        });
    }

    const getSettings = (settings) => {
        let setts = {
            apiUrl: settings.apiUrl || defaultSettings.apiUrl,
            authUrl: settings.authUrl || defaultSettings.authUrl
        };

        return setts;
    }

    return {
        init: init
    }
}

export default useAppSettingsService;