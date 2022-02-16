import { useRecoilValue } from 'recoil';
import { useLocationsState, LocationsStateActions } from '../State/LocationsState';
import useNotificationService from './NotificationService';
import useLoggerService from './Diagnostics/LoggerService';
import { usePlansState } from '../State/PlansState';
import useRestClient from '../Common/RestClient';
import LocationDto from '../Common/Dto/LocationDto';
import { CoordinateDto } from '../Common/Dto/CoordinateDto';
import { appSettingsState } from '../State/AppState';

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
  const { dispatch: dispatchLocations } = useLocationsState();
  const { state: plansState } = usePlansState();
  const notificationService = useNotificationService();
  const persistentLocationService = usePersistentService();
  const logger = useLoggerService('LocationService');

  const setLoading = () => {
    dispatchLocations({
      type: LocationsStateActions.isLoading,
      data: true,
    });
  };

  const clearLoading = () => {
    dispatchLocations({
      type: LocationsStateActions.isLoading,
      data: false,
    });
  };

  const add = (location: LocationDto) => {
    setLoading();

    persistentLocationService.add(
      convertCoordinates(location),
      plansState.selectedPlanId,
    )
      .then((locationData: LocationDto) => {
        dispatchLocations({
          type: LocationsStateActions.addLocation,
          data: locationData,
        });

        notificationService.success(`New location added: ${locationData.name}`);
        logger.info(`Successfully added location -> Id: ${locationData.id} Name: ${locationData.name} to the plan -> Id: ${plansState.selectedPlanId}`);
      })
      .catch(() => {
        notificationService.error(`Error while adding location: ${location.name}`);
        logger.error(`Error while adding new location: Name: ${location.name}`);
      })
      .finally(() => {
        clearLoading();
      });
  };

  const edit = (location: LocationDto) => {
    setLoading();

    persistentLocationService.edit(convertCoordinates(location))
      .then(() => {
        dispatchLocations({
          type: LocationsStateActions.editLocation,
          data: location,
        });

        notificationService.success(`Location modified: ${location.name}`);
        logger.info(`Successfully edited location -> Id: ${location.id} Name: ${location.name}`);
      })
      .catch(() => {
        notificationService.error(`Error while editing location: ${location.name}`);
        logger.error(`Error while editing location: Id: ${location.id} Name: ${location.name}`);
      })
      .finally(() => {
        clearLoading();
      });
  };

  const remove = (location: LocationDto) => {
    setLoading();

    persistentLocationService.remove(location)
      .then(() => {
        dispatchLocations({
          type: LocationsStateActions.removeLocation,
          data: location,
        });

        notificationService.success(`Location removed: ${location.name}`);
        logger.info(`Successfully removed location -> Id: ${location.id} Name: ${location.name}`);
      })
      .catch(() => {
        notificationService.error(`Error while removing location: ${location.name}`);
        logger.error(`Error while removing location: Id: ${location.id} Name: ${location.name}`);
      })
      .finally(() => {
        clearLoading();
      });
  };

  const getAll = (planId: number): Promise<LocationDto[]> => new Promise((resolve, reject) => {
    setLoading();
    persistentLocationService.getAll(planId)
      .then((data: LocationDto[]) => {
        dispatchLocations({
          type: LocationsStateActions.loadLocations,
          data,
        });

        logger.info(`Successfully loaded ${data.length} locations`);
        resolve(data);
      })
      .catch(() => {
        notificationService.error('Error while getting locations');
        logger.error('Error while getting all plans data.');
        reject();
        clearLoading();
      })
      .finally(() => {
        clearLoading();
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
