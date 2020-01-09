import React, { useReducer, useContext, createContext } from 'react';
import { LocationsStateProvider, LocationsStateActions, _defaultReducer, EmptyState } from './LocationsState'

const DbActions = {
    add: 'create',
    remove: 'remove',
    edit: 'update',
    removeAll: 'removeAll'
}

const DbPersistentLocationState = ({ children }) => {
    return <LocationsStateProvider reducerHook={useDbReducer(_defaultReducer, EmptyState)}>
        {children}
    </LocationsStateProvider>
}

const useDbReducer = (baseReducer, initState) => {
    const [state, dispatch] = useReducer(baseReducer, initState);

    var dbDispatcher = (dispatch) => {
        return async (action) => {
            const resultData = await dbAction(action);
            if (resultData) {
                action.data = resultData;
            }

            dispatch(action);
        }
    }

    return [state, dbDispatcher(dispatch)]
}

var dbAction = async (action) => {
    switch (action.type) {
        case LocationsStateActions.addLocation:
            return await dispatchDbAction(DbActions.add, action.data);
        case LocationsStateActions.removeLocation:
            break;
        case LocationsStateActions.editLocation:
            break;
        case LocationsStateActions.removeAllLocations:
            break;
        default:
            console.info(`[DbPersistentLocationState] Action: "${action.type}" id not db action.`);
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

    if(rawResponse.status !== 200 || rawResponse.status !== 201){
        console.error(rawResponse);
        return null;
    }
    
    const content = await rawResponse.json();
    return content;
}

export default DbPersistentLocationState;