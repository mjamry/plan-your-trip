import { useLocationsState, LocationsStateActions } from './LocationsState'
import useNotificationService from './NotificationService'

const useLocationService = () => {
    const [{}, dispatchLocations] = useLocationsState();
    const notificationService = useNotificationService();

    var add = (location) => {
        dispatchLocations({
            type: LocationsStateActions.addLocation, 
            data: location});
        
        notificationService.success(`New location added: ${location.name}`);
    }

    var edit = (location) => {
        dispatchLocations({
            type: LocationsStateActions.editLocation, 
            data: location})

        notificationService.success(`Location modified: ${location.name}`);
    }

    var remove = (location) => {
        dispatchLocations({
            type: LocationsStateActions.removeLocation, 
            data: location})
            
        notificationService.success(`Location removed: ${location.name}`);
    }

    return {
        add: add, 
        edit: edit, 
        remove: remove}
}

export default useLocationService;