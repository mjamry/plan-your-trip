import { DashboardDto } from '../Common/Dto/DashboardDto';
import useRestClient from '../Common/RestClient';
import { useAppState } from '../State/AppState';

interface IUserDataService {
  getDashboard: () => Promise<DashboardDto>;
}

const useUserDataService = (): IUserDataService => {
  const api = useRestClient();
  const { state: appState } = useAppState();

  const url = `${appState.appSettings.apiUrl}/userData/dashboard`;

  const getDashboard = async (): Promise<DashboardDto> => api.get(url);

  return {
    getDashboard,
  };
};

export default useUserDataService;
