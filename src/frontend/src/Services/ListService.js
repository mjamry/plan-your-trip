import useNotificationService from '../Services/NotificationService'
import useLoggerService from './Diagnostics/LoggerService'
import { useListsState, ListsStateActions } from '../State/ListsState'
import useRestClient from './../Common/RestClient'

const API_URL = 'http://localhost:50001/lists'

const usePersistentListService = () => {
    const api = useRestClient();

    var add = (list) => {
        return api.post(`${API_URL}/create`, list)
    }

    var remove = (list) => {
        return api.post(`${API_URL}/delete`, list)
    }

    var edit = (list) => {
        return api.post(`${API_URL}/update`, list)
    }

    var getAll = () => {
        return api.get(`${API_URL}`)
    } 

    return {
        add: add,
        remove: remove,
        edit: edit,
        getAll: getAll
    }
}

const useListService = () => {
    const notificationService = useNotificationService();
    const persistentListService = usePersistentListService();
    const logger = useLoggerService();
    const [{selectedListId}, dispatchLists] = useListsState();

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

        persistentListService.add(list)
            .then((listData)=>
            {
                dispatchLists({
                    type: ListsStateActions.addList, 
                    data: listData});
    
                dispatchLists({
                    type: ListsStateActions.selectList, 
                    data: listData.id});
                    
                notificationService.success(`New list added: ${listData.name}`);
                logger.info(`[ListService] Successfully added list -> Id: ${listData.id} Name: ${listData.name}`)
            })
            .catch(()=>
            {
                notificationService.error(`Error while adding list: ${list.name}`);
                logger.error(`Error while adding new list: Name: ${list.name}`);
            })
            .finally(()=>
            {
                clearLoading();
            }) 
    }

    var edit = async (list) => {
        setLoading();

        persistentListService.edit(list)
            .then((listData)=>
            {
                dispatchLists({
                    type: ListsStateActions.editList, 
                    data: listData})
        
                notificationService.success(`list modified: ${list.name}`);
                logger.info(`[ListService] Successfully edited list -> Id: ${list.id} Name: ${list.name}`)
            })
            .catch(()=>
            {
                notificationService.error(`Error while editing list: ${list.name}`);
                logger.error(`Error while editing list: Id: ${list.id} Name: ${list.name}`);
            })
            .finally(()=>
            {
                clearLoading();
            })
    }

    var remove = async (list) => {
        setLoading();

        persistentListService.remove(list)
            .then(()=>
            {
                dispatchLists({
                    type: ListsStateActions.removeList, 
                    data: list})
                    
                notificationService.success(`list removed: ${list.name}`);
                logger.info(`[ListService] Successfully removed list -> Id: ${list.id} Name: ${list.name}`)
            })
            .catch(()=>
            {
                notificationService.error(`Error while removing list: ${list.name}`);
                logger.error(`Error while removing list: Id: ${list.id} Name: ${list.name}`);
            })
            .finally(()=>
            {
                clearLoading();
            })
    }

    var getAll = () => {
        persistentListService.getAll()
            .then((data)=>
            {
                dispatchLists({
                    type: ListsStateActions.loadLists, 
                    data: data});

                logger.info(`[ListService] Successfully loaded ${data.length} lists`);
            })
            .catch(()=>
            {
                logger.error(`[ListService] Error while getting all lists data.`)
            })
            
    }

    return {
        add: add, 
        edit: edit, 
        remove: remove,
        getAll: getAll
    }
}

export default useListService;