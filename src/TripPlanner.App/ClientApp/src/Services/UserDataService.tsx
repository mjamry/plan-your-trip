import { useRecoilValue } from 'recoil';
import { DashboardDto } from '../Common/Dto/DashboardDto';
import UserDto from '../Common/Dto/UserDto';
import useRestClient from '../Common/RestClient';
import { appSettingsState } from '../State/AppState';

interface IUserDataService {
  getDashboard: () => Promise<DashboardDto>;
  getUsersToShareWith: () => Promise<UserDto[]>;
}

const useUserDataService = (): IUserDataService => {
  const api = useRestClient();
  const appSettings = useRecoilValue(appSettingsState);
  const url = `${appSettings.apiUrl}/userData`;

  const getDashboard = async () => api.get<DashboardDto>(`${url}/dashboard`);

  const getUsersToShareWith = async () => api.get<UserDto[]>(`${url}/usersToShare`);

  return {
    getDashboard,
    getUsersToShareWith,
  };
};

export default useUserDataService;
