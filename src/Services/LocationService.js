import { useLocationsState, LocationsStateActions } from '../State/LocationsState'
import useNotificationService from '../Services/NotificationService'
import useDbPersistenceService from './DbPersistentLocationService'
import useLoggerService from './Diagnostics/LoggerService'
import { useListsState } from '../State/LocationsListsState'

const useLocationService = () => {
    const [{selectLocationsList}, dispatchLocations] = useLocationsState();
    const notificationService = useNotificationService();
    const dbPersistentLocationService = useDbPersistenceService();
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

    var add = async (location) => {
        setLoading();
        try{
            var locationData = await dbPersistentLocationService.add(location, selectedListId)
            dispatchLocations({
                type: LocationsStateActions.addLocation, 
                data: locationData});
            
            notificationService.success(`New location added: ${locationData.name}`);
            logger.info(`[LocationService] Successfully added location -> Id: ${locationData.id} Name: ${locationData.name} to list -> Id: ${selectedListId}`)
        }
        catch(e)
        {
            notificationService.error(`Error while adding location: ${location.name}`);
            logger.error(`Error while adding new location: Name: ${location.name}`, e);
        }
        finally{
            clearLoading();
        }
  
    }

    var edit = async (location) => {
        setLoading();
        try{
            await dbPersistentLocationService.edit(location)
            dispatchLocations({
                type: LocationsStateActions.editLocation, 
                data: location})
    
            notificationService.success(`Location modified: ${location.name}`);
            logger.info(`[LocationService] Successfully edited location -> Id: ${location.id} Name: ${location.name}`)
        }
        catch(e)
        {
            notificationService.error(`Error while editing location: ${location.name}`);
            logger.error(`Error while editing location: Id: ${location.id} Name: ${location.name}`, e);
        }
        finally{
            clearLoading();
        }
    }

    var remove = async (location) => {
        setLoading();
        try{
            await dbPersistentLocationService.remove(location)
            dispatchLocations({
                type: LocationsStateActions.removeLocation, 
                data: location})
                
            notificationService.success(`Location removed: ${location.name}`);
            logger.info(`[LocationService] Successfully removed location -> Id: ${location.id} Name: ${location.name}`)
        }
        catch(e)
        {
            notificationService.error(`Error while removing location: ${location.name}`);
            logger.error(`Error while removing location: Id: ${location.id} Name: ${location.name}`, e);
        }
        finally{
            clearLoading();
        }
    }

    return {
        add: add, 
        edit: edit, 
        remove: remove}
}

export default useLocationService;