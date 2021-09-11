import { Dashboard } from '../Common/Dto/Dashboard';
import useRestClient from '../Common/RestClient';
import { useAppState } from '../State/AppState';

interface IUserDataService {
  getDashboard: () => Promise<Dashboard>;
}

const useUserDataService = (): IUserDataService => {
  const api = useRestClient();
  const { state: appState } = useAppState();

  const url = `${appState.appSettings.apiUrl}/userData/dashboard`;

  const getDashboard = async (): Promise<Dashboard> => api.get(url);

  return {
    getDashboard,
  };
};

export default useUserDataService;
