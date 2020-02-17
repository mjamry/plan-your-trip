
import useNotificationService from '../Services/NotificationService'
import useLoggerService from './Diagnostics/LoggerService'
import { useLocationsListsState, ListsStateActions } from '../State/LocationsListsState'

const DbActions = {
    add: 'create',
    delete: 'delete',
    update: 'update'
}
const usePersistentListService = () => {
    const logger = useLoggerService();

    var add = async (location, listId) => {
        return await dispatchDbAction(DbActions.add, location);
    }

    var remove = async (location) => {
        await dispatchDbAction(DbActions.delete, location);
    }

    var edit = async (location) => {
        await dispatchDbAction(DbActions.update, location);
    }

    return {
        add: add,
        remove: remove,
        edit: edit
    }
}

const dispatchDbAction = async (dbAction, data) => {
    let url = 'http://localhost:50000/lists/' + dbAction;
    var logger = useLoggerService();

    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(rawResponse.status !== 200 && rawResponse.status !== 201){
        logger.error(`[DbPresistentLocationService] Error - Action: ${dbAction}`, rawResponse);
        throw new Error(rawResponse);
    }
    
    const content = await rawResponse.json();
    logger.debug(`[DbPresistentLocationService] Success -> Action: ${dbAction}`, content)
    return content;
}

const useListService = () => {
    const notificationService = useNotificationService();
    const persistentListService = usePersistentListService();
    const logger = useLoggerService();
    const [{selectedListId}, dispatchLists] = useLocationsListsState();

    var setLoading = () => {
        dispatchLists({
            type: ListsStateActions.isLoading, 
            data: true});
    }

    var clearLoading = () => {
        dispatchLists({
            type: ListsStateActions.isLoading, 
            data: false});
    }

    var add = async (list) => {
        setLoading();
        try{
            var listData = await persistentListService.add(location, selectedListId)
            dispatchLists({
                type: ListsStateActions.addList, 
                data: listData});
            
            notificationService.success(`New list added: ${listData.name}`);
            logger.info(`[ListService] Successfully added list -> Id: ${listData.id} Name: ${listData.name}`)
        }
        catch(e)
        {
            notificationService.error(`Error while adding list: ${list.name}`);
            logger.error(`Error while adding new list: Name: ${list.name}`, e);
        }
        finally{
            clearLoading();
        }
  
    }

    var edit = async (list) => {
        setLoading();
        try{
            await persistentListService.edit(list)
            dispatchLists({
                type: ListsStateActions.editlist, 
                data: list})
    
            notificationService.success(`list modified: ${list.name}`);
            logger.info(`[ListService] Successfully edited list -> Id: ${list.id} Name: ${list.name}`)
        }
        catch(e)
        {
            notificationService.error(`Error while editing list: ${list.name}`);
            logger.error(`Error while editing list: Id: ${list.id} Name: ${list.name}`, e);
        }
        finally{
            clearLoading();
        }
    }

    var remove = async (list) => {
        setLoading();
        try{
            await persistentListService.remove(list)
            dispatchLists({
                type: ListsStateActions.removelist, 
                data: list})
                
            notificationService.success(`list removed: ${list.name}`);
            logger.info(`[ListService] Successfully removed list -> Id: ${list.id} Name: ${list.name}`)
        }
        catch(e)
        {
            notificationService.error(`Error while removing list: ${list.name}`);
            logger.error(`Error while removing list: Id: ${list.id} Name: ${list.name}`, e);
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

export default useListService;