const DbActions = {
    add: 'create',
    delete: 'delete',
    update: 'update',
    removeAll: 'removeAll'
}

const useDbPresistentLocationService = () => {
    var add = async (location) => {
        await dispatchDbAction(DbActions.add, location);
    }

    var remove = async (location) => {
        await dispatchDbAction(DbActions.delete, location);
    }

    var edit = async (location) => {
        await dispatchDbAction(DbActions.update, location);
    }

    var removeAll = async () => {
        console.warning("Remove all is not implemented yet");
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

    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log(rawResponse);

    if(rawResponse.status !== 200 && rawResponse.status !== 201){
        console.error(rawResponse);
        throw new Error(rawResponse);
    }
    
    const content = await rawResponse.json();
    return content;
}

export default useDbPresistentLocationService;