import { useRecoilValue, useSetRecoilState } from 'recoil';
import useNotificationService from './NotificationService';
import useLoggerService from './Diagnostics/LoggerService';
import { usePlansState } from '../State/PlansState';
import useRestClient from '../Common/RestClient';
import LocationDto from '../Common/Dto/LocationDto';
import { CoordinateDto } from '../Common/Dto/CoordinateDto';
import { appSettingsState } from '../State/AppState';
import {
  isLoadingState,
  locationsState,
  modifyLocationsState,
  LocationsStateActions,
} from '../State/LocationsState';

const convertCoordinates = (location: LocationDto): LocationDto => {
  const coordinates: CoordinateDto = {
    lat: Number(location.coordinates.lat),
    lon: Number(location.coordinates.lon),
  };

  return { ...location, coordinates };
};

interface ILocationService {
    add: (location: LocationDto, planId: number) => void;
    remove: (location: LocationDto) => void;
    edit: (location: LocationDto) => void;
    getAll: (planId: number) => Promise<LocationDto[]>;
}

const usePersistentService = () => {
  const api = useRestClient();
  const appSettings = useRecoilValue(appSettingsState);
  const apiUrl = `${appSettings.apiUrl}/locations`;

  const add = (location: LocationDto, planId: number) => api.post<LocationDto>(`${apiUrl}/${planId}`, location);

  const remove = (location: LocationDto) => api.del<LocationDto>(apiUrl, location);

  const edit = (location: LocationDto) => api.put<LocationDto>(apiUrl, location);

  const getAll = (planId: number) => api.get<LocationDto[]>(`${apiUrl}/${planId}`);

  return {
    add,
    remove,
    edit,
    getAll,
  };
};

const useLocationService = (): ILocationService => {
  const addLocation = useSetRecoilState(modifyLocationsState(LocationsStateActions.addLocation));
  const editLocation = useSetRecoilState(modifyLocationsState(LocationsStateActions.editLocation));
  const removeLocation = useSetRecoilState(
    modifyLocationsState(LocationsStateActions.removeLocation),
  );
  const setIsLoading = useSetRecoilState(isLoadingState);
  const setLocations = useSetRecoilState(locationsState);
  const { state: plansState } = usePlansState();
  const notificationService = useNotificationService();
  const persistentLocationService = usePersistentService();
  const logger = useLoggerService('LocationService');

  const add = (location: LocationDto) => {
    setIsLoading(true);

    persistentLocationService.add(
      convertCoordinates(location),
      plansState.selectedPlanId,
    )
      .then((locationData: LocationDto) => {
        addLocation([locationData]);

        notificationService.success(`New location added: ${locationData.name}`);
        logger.info(`Successfully added location -> Id: ${locationData.id} Name: ${locationData.name} to the plan -> Id: ${plansState.selectedPlanId}`);
      })
      .catch((err) => {
        notificationService.error(`Error while adding location: ${location.name}`);
        logger.error(`Error while adding new location: Name: ${location.name}`, err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const edit = (location: LocationDto) => {
    setIsLoading(true);

    persistentLocationService.edit(convertCoordinates(location))
      .then(() => {
        editLocation([location]);

        notificationService.success(`Location modified: ${location.name}`);
        logger.info(`Successfully edited location -> Id: ${location.id} Name: ${location.name}`);
      })
      .catch((err) => {
        notificationService.error(`Error while editing location: ${location.name}`);
        logger.error(`Error while editing location: Id: ${location.id} Name: ${location.name}`, err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const remove = (location: LocationDto) => {
    setIsLoading(true);

    persistentLocationService.remove(location)
      .then(() => {
        removeLocation([location]);

        notificationService.success(`Location removed: ${location.name}`);
        logger.info(`Successfully removed location -> Id: ${location.id} Name: ${location.name}`);
      })
      .catch((err) => {
        notificationService.error(`Error while removing location: ${location.name}`);
        logger.error(`Error while removing location: Id: ${location.id} Name: ${location.name}`, err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getAll = (planId: number): Promise<LocationDto[]> => new Promise((resolve, reject) => {
    setIsLoading(true);

    persistentLocationService.getAll(planId)
      .then((data: LocationDto[]) => {
        setLocations(data);

        logger.info(`Successfully loaded ${data.length} locations`);
        resolve(data);
      })
      .catch((err) => {
        notificationService.error('Error while getting locations');
        logger.error('Error while getting all plans data.', err);
        reject();
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  return {
    add,
    edit,
    remove,
    getAll,
  };
};

export default useLocationService;
