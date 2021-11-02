import { useLocationsState, LocationsStateActions } from '../State/LocationsState';
import useNotificationService from './NotificationService';
import useLoggerService from './Diagnostics/LoggerService';
import { useListsState } from '../State/ListsState';
import useRestClient from '../Common/RestClient';
import { useAppState } from '../State/AppState';
import LocationDto from '../Common/Dto/LocationDto';

interface ILocationService {
    add: (location: LocationDto, listId: number) => void;
    remove: (location: LocationDto) => void;
    edit: (location: LocationDto) => void;
    getAll: (listId: number) => Promise<LocationDto[]>;
}

const usePersistentService = () => {
  const api = useRestClient();
  const { state: appState } = useAppState();

  const apiUrl = `${appState.appSettings.apiUrl}/locations`;

  const add = (location: LocationDto, listId: number) => api.post<LocationDto>(`${apiUrl}/${listId}`, location);

  const remove = (location: LocationDto) => api.del<LocationDto>(apiUrl, location);

  const edit = (location: LocationDto) => api.put<LocationDto>(apiUrl, location);

  const getAll = (listId: number) => api.get<LocationDto[]>(`${apiUrl}/${listId}`);

  return {
    add,
    remove,
    edit,
    getAll,
  };
};

const useLocationService = (): ILocationService => {
  const { dispatch: dispatchLocations } = useLocationsState();
  const { state: listState } = useListsState();
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

    persistentLocationService.add(location, listState.selectedListId)
      .then((locationData: LocationDto) => {
        dispatchLocations({
          type: LocationsStateActions.addLocation,
          data: locationData,
        });

        notificationService.success(`New location added: ${locationData.name}`);
        logger.info(`Successfully added location -> Id: ${locationData.id} Name: ${locationData.name} to list -> Id: ${listState.selectedListId}`);
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

    persistentLocationService.edit(location)
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

  const getAll = (listId: number): Promise<LocationDto[]> => new Promise((resolve, reject) => {
    setLoading();
    persistentLocationService.getAll(listId)
      .then((data: LocationDto[]) => {
        dispatchLocations({
          type: LocationsStateActions.loadLocations,
          data,
        });

        logger.info(`Successfully loaded ${data.length} locations`);
        resolve(data);
      })
      .catch(() => {
        logger.error('Error while getting all lists data.');
        reject();
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
