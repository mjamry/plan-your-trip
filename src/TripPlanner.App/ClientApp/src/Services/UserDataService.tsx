import { DashboardDto } from '../Common/Dto/DashboardDto';
import UserDto from '../Common/Dto/UserDto';
import useRestClient from '../Common/RestClient';
import { useAppState } from '../State/AppState';

interface IUserDataService {
  getDashboard: () => Promise<DashboardDto>;
  getUsersToShareWith: () => Promise<UserDto[]>;
}

const useUserDataService = (): IUserDataService => {
  const api = useRestClient();
  const { state: appState } = useAppState();

  const url = `${appState.appSettings.apiUrl}/userData`;

  const getDashboard = async () => api.get<DashboardDto>(`${url}/dashboard`);

  const getUsersToShareWith = async () => api.get<UserDto[]>(`${url}/usersToShare`);

  return {
    getDashboard,
    getUsersToShareWith,
  };
};

export default useUserDataService;
