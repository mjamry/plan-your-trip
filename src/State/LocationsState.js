import React, {useReducer, useContext, createContext} from 'react';
import store from 'store'

const EmptyState = {
    locations: [],
    locationSelectedToEdit: null,
    locationSelectedOnMap: null
}

export const LocationsStatusActions = {
    addLocation: 'addLocation',
    removeLocation: 'removeLocation',
    editLocation: 'editLocation',
    selectOnMap: 'selectOnMap',
    removeAllLocations: 'removeAllLocations'
}

export const LocationsStateContext = createContext();

export const LocationsStateProvider = ({children}) => {
    return (
        <LocationsStateContext.Provider value={useReducer(_reducer, _restoreLocations())}>
            {children}
        </LocationsStateContext.Provider>
    )
}

export var useLocationsState = () => useContext(LocationsStateContext);

var _storeLocations = (state) => {
    store.set('locationsState', state);
}

var _restoreLocations = () => {
   return store.get('locationsState', EmptyState);
}

var _reducer = (state, action) => {
    var newState = {};

    switch(action.type){
        case LocationsStatusActions.addLocation: 
            newState =  {...state, locations: [...state.locations, action.data]};
            break;
        case LocationsStatusActions.removeLocation:
            var updatedLocations = state.locations.filter(location => location.id !== action.data.id) || [];
            newState = {...state, locations: updatedLocations};
            break;
        case LocationsStatusActions.editLocation:
            console.log(action.data);
            break;
        case LocationsStatusActions.selectOnMap:
            newState = {...state, locationSelectedOnMap: action.data};
            break;
        case LocationsStatusActions.removeAllLocations:
            newState = {...state, locations: []};
            break;
        default:
            newState = state;    
            console.error(`[LocationsStatus] Action: "${action.type}" was not defined.`);
    }

    _storeLocations(newState);
    return newState;
}