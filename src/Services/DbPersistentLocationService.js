import useLoggerService from './Diagnostics/LoggerService'

const DbActions = {
    add: 'create',
    delete: 'delete',
    update: 'update',
    removeAll: 'removeAll'
}

const useDbPresistentLocationService = () => {
    const logger = useLoggerService();

    var add = async (location, listId) => {
        var action = `${DbActions.add}/list/${listId}`
        return await dispatchDbAction(action, location);
    }

    var remove = async (location) => {
        await dispatchDbAction(DbActions.delete, location);
    }

    var edit = async (location) => {
        await dispatchDbAction(DbActions.update, location);
    }

    var removeAll = async () => {
        logger.warning("Remove all is not implemented yet");
    }

    return {
        add: add,
        remove: remove,
        edit: edit,
        removeAll: removeAll
    }
}

const dispatchDbAction = async (dbAction, data) => {
    let url = 'http://localhost:5000/locations/' + dbAction;
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

export default useDbPresistentLocationService;