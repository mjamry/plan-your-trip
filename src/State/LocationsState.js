import React, {useReducer, useContext, createContext} from 'react';

export const LocationsStatusAction = {
    addLocation: 'addLocation',
    removeLocation: 'removeLocation',
    editLocation: 'editLocation'
}

var reducer = (state, action) => {
    switch(action.type){
        case LocationsStatusAction.addLocation: 
            console.log(action.data);
            break;
        case LocationsStatusAction.removeLocation:
            console.log(action.data);
            break;
        case LocationsStatusAction.editLocation:
            console.log(action.data);
            break;
        default:
            console.error("LocationsStatusAction {action.type} was not defined.");
    }
}

export const LocationsStateContext = createContext();

export const LocationsStateProvider = ({initialState, children}) => {
    return (
        <LocationsStateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </LocationsStateContext.Provider>
    )
}

export var useLocationsState = () => useContext(LocationsStateContext);