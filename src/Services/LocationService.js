import { useLocationsState, LocationsStateActions } from '../State/LocationsState'
import useNotificationService from '../Services/NotificationService'
import useDbPersistenceService from './DbPersistentLocationService'

const useLocationService = () => {
    const [{}, dispatchLocations] = useLocationsState();
    const notificationService = useNotificationService();
    const dbPersistentLocationService = useDbPersistenceService();

    var add = async (location) => {
        try{
            await dbPersistentLocationService.add(location)
            dispatchLocations({
                type: LocationsStateActions.addLocation, 
                data: location});
            
            notificationService.success(`New location added: ${location.name}`);
        }
        catch(e)
        {
            notificationService.error(`Error while adding location: ${location.name}`);
        }
  
    }

    var edit = async (location) => {
        try{
            await dbPersistentLocationService.edit(location)
            dispatchLocations({
                type: LocationsStateActions.editLocation, 
                data: location})
    
            notificationService.success(`Location modified: ${location.name}`);
        }
        catch(e)
        {
            notificationService.error(`Error while editing location: ${location.name}`);
        }
    }

    var remove = async (location) => {
        try{
            await dbPersistentLocationService.remove(location)
            dispatchLocations({
                type: LocationsStateActions.removeLocation, 
                data: location})
                
            notificationService.success(`Location removed: ${location.name}`);
        }
        catch(e)
        {
            notificationService.error(`Error while removing location: ${location.name}`);
        }
    }

    return {
        add: add, 
        edit: edit, 
        remove: remove}
}

export default useLocationService;