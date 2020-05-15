import { useLocationsState, LocationsStateActions } from '../State/LocationsState'
import useNotificationService from '../Services/NotificationService'
import useLoggerService from './Diagnostics/LoggerService'
import { useListsState } from '../State/ListsState'
import useRestClient from './../Common/RestClient'

const API_URL = 'http://localhost:50001/locations'

const usePersistentService = () => {
    const api = useRestClient();

    var add = (location, listId) => {
        return api.post(`${API_URL}/create/list/${listId}`, location);
    }

    var remove = (location) => {
        return api.post(`${API_URL}/delete`, location);
    }

    var edit = (location) => {
        return api.post(`${API_URL}/update`, location)
    }

    var getAll = (listId) => {
        return api.get(`${API_URL}/list/${listId}`)
    }

    return {
        add: add,
        remove: remove,
        edit: edit,
        getAll: getAll
    }
}

const useLocationService = () => {
    const [{selectLocationsList}, dispatchLocations] = useLocationsState();
    const notificationService = useNotificationService();
    const persistentLocationService = usePersistentService();
    const logger = useLoggerService();
    const [{selectedListId}, dispatchLists] = useListsState();

    var setLoading = () => {
        dispatchLocations({
            type: LocationsStateActions.isLoading, 
            data: true});
    }

    var clearLoading = () => {
        dispatchLocations({
            type: LocationsStateActions.isLoading, 
            data: false});
    }

    var add = (location) => {
        setLoading();

        persistentLocationService.add(location, selectedListId)
            .then((locationData)=>
            {
                dispatchLocations({
                    type: LocationsStateActions.addLocation, 
                    data: locationData});
                
                notificationService.success(`New location added: ${locationData.name}`);
                logger.info(`[LocationService] Successfully added location -> Id: ${locationData.id} Name: ${locationData.name} to list -> Id: ${selectedListId}`)
            })
            .catch(()=>
            {
                notificationService.error(`Error while adding location: ${location.name}`);
                logger.error(`[LocationService] Error while adding new location: Name: ${location.name}`);
            })
            .finally(()=>
            {
                clearLoading();
            }) 
    }

    var edit = (location) => {
        setLoading();

        persistentLocationService.edit(location)
            .then(()=>
            {
                dispatchLocations({
                    type: LocationsStateActions.editLocation, 
                    data: location})
        
                notificationService.success(`Location modified: ${location.name}`);
                logger.info(`[LocationService] Successfully edited location -> Id: ${location.id} Name: ${location.name}`)
            })
            .catch(()=>
            {
                notificationService.error(`Error while editing location: ${location.name}`);
                logger.error(`[LocationService] Error while editing location: Id: ${location.id} Name: ${location.name}`);
            })
            .finally(()=>
            {
                clearLoading();
            })
    }

    var remove = (location) => {
        setLoading();

        persistentLocationService.remove(location)
            .then(()=>
            {
                dispatchLocations({
                    type: LocationsStateActions.removeLocation, 
                    data: location})
                    
                notificationService.success(`Location removed: ${location.name}`);
                logger.info(`[LocationService] Successfully removed location -> Id: ${location.id} Name: ${location.name}`)
            })
            .catch(()=>
            {
                notificationService.error(`Error while removing location: ${location.name}`);
                logger.error(`[LocationService] Error while removing location: Id: ${location.id} Name: ${location.name}`);
            })
            .finally(()=>
            {
                clearLoading();
            })
    }

    var getAll = (listId) => {
        persistentLocationService.getAll(listId)
            .then((data)=>
            {
                dispatchLocations({
                    type: LocationsStateActions.loadLocations,
                    data: data
                })

                logger.info(`[LocationService] Successfully loaded ${data.length} locations`)
            })
            .catch(()=>
            {
                logger.error(`[LocationService] Error while getting all lists data.`)
            })
    }

    return {
        add: add, 
        edit: edit, 
        remove: remove,
        getAll: getAll
    }
}

export default useLocationService;