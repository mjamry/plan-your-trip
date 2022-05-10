import {
  // eslint-disable-next-line camelcase
  useRecoilValue, useSetRecoilState,
} from 'recoil';
import { v4 as uuid } from 'uuid';
import useNotificationService from './NotificationService';
import useLoggerService from './Diagnostics/LoggerService';
import useRestClient from '../Common/RestClient';
import LocationDto from '../Common/Dto/LocationDto';
import { CoordinateDto } from '../Common/Dto/CoordinateDto';
import { appSettingsState } from '../State/AppState';
import {
  isLoadingState,
  locationsState,
  modifyLocationsState,
  LocationsStateActions,
  isLoadingTitleState,
} from '../State/LocationsState';
import { selectedPlanIdState } from '../State/PlansState';
import { locationFormImageFile } from '../components/modals/LocationDetailsForm/LocationDetailsFormState';
import useStorageService from './StorageService';
import { Nullable } from '../Common/Dto/Nullable';

interface ILocationService {
    add: (location: LocationDto, imageFile: Nullable<File>) => void;
    remove: (location: LocationDto) => void;
    edit: (location: LocationDto, imageFile: Nullable<File>) => void;
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
  const setIsLoadingTitle = useSetRecoilState(isLoadingTitleState);
  const setLocations = useSetRecoilState(locationsState);
  const setImageFile = useSetRecoilState(locationFormImageFile);
  const selectedPlanId = useRecoilValue(selectedPlanIdState);
  const notificationService = useNotificationService();
  const persistentLocationService = usePersistentService();
  const logger = useLoggerService('LocationService');
  const storageService = useStorageService();

  const convertCoordinates = (location: LocationDto): LocationDto => {
    const coordinates: CoordinateDto = {
      lat: Number(location.coordinates.lat),
      lon: Number(location.coordinates.lon),
    };

    return { ...location, coordinates };
  };

  const updateImageFileName = (location: LocationDto, imageFile: Nullable<File>): LocationDto => {
    if (imageFile) {
      const fileName = `${uuid()}.${imageFile.type.replace(/(.*)\//g, '')}`;
      return { ...location, image: fileName };
    }
    return location;
  };

  const storeImage = async (imageFile: Nullable<File>, fileName: Nullable<string>) => {
    if (imageFile && fileName) {
      await storageService.uploadFile(fileName, imageFile);
      setImageFile(null);
    }
  };

  const add = async (location: LocationDto, imageFile: Nullable<File>) => {
    setIsLoading(true);
    setIsLoadingTitle('Adding new location');

    try {
      const locationData = await persistentLocationService.add(
        convertCoordinates(updateImageFileName(location, imageFile)),
        selectedPlanId,
      );

      try {
        setIsLoadingTitle('Uploading image');

        await storeImage(imageFile, locationData.image);

        addLocation([locationData]);

        notificationService.success(`New location added: ${locationData.name}`);
        logger.info(`Successfully added location -> Id: ${locationData.id} Name: ${locationData.name} to the plan -> Id: ${selectedPlanId}`);
      } catch (err: any) {
        notificationService.error('Error while uploading location image');
        logger.error(`Error while uploading location image: ${location.image}`, err);
      }
    } catch (err: any) {
      notificationService.error(`Error while adding location: ${location.name}`);
      logger.error(`Error while adding new location: Name: ${location.name}`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const edit = async (location: LocationDto, imageFile: Nullable<File>) => {
    setIsLoading(true);
    setIsLoadingTitle('Adding new location');

    try {
      const locationData = await persistentLocationService.edit(
        convertCoordinates(updateImageFileName(location, imageFile)),
      );

      try {
        setIsLoadingTitle('Uploading image');

        await storeImage(imageFile, locationData.image);

        editLocation([locationData]);

        notificationService.success(`Location updated: ${location.name}`);
        logger.info(`Successfully updated location -> Id: ${location.id} Name: ${location.name}`);
      } catch (err: any) {
        notificationService.error('Error while uploading location image');
        logger.error(`Error while uploading location image: ${location.image}`, err);
      }
    } catch (err: any) {
      notificationService.error(`Error while updating location: ${location.name}`);
      logger.error(`Error while updating location: Id: ${location.id} Name: ${location.name}`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (location: LocationDto) => {
    try {
      setIsLoading(true);

      await persistentLocationService.remove(location);

      removeLocation([location]);

      notificationService.success(`Location removed: ${location.name}`);
      logger.info(`Successfully removed location -> Id: ${location.id} Name: ${location.name}`);
    } catch (err: any) {
      notificationService.error(`Error while removing location: ${location.name}`);
      logger.error(`Error while removing location: Id: ${location.id} Name: ${location.name}`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const getAll = async (planId: number): Promise<LocationDto[]> => {
    try {
      setIsLoading(true);

      const data = await persistentLocationService.getAll(planId);
      setLocations(data);

      logger.info(`Successfully loaded ${data.length} locations`);
      return data;
    } catch (err: any) {
      notificationService.error('Error while getting locations');
      logger.error('Error while getting all plans data.', err);
    } finally {
      setIsLoading(false);
    }

    return [];
  };

  return {
    add,
    edit,
    remove,
    getAll,
  };
};

export default useLocationService;
