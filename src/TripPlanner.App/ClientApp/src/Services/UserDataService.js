
import useRestClient from './../Common/RestClient'
import { useAppState } from '../State/AppState'

const useUserDataService = () => {
    const api = useRestClient();
    const [appState, dispatchAppState] = useAppState(null);

    const url = appState.appSettings.apiUrl + '/userData/dashboard';

    const getDashboard = async () =>
    {
        return await api.get(url);
    }

    return {
        getDashboard: getDashboard
    }
}

export default useUserDataService;