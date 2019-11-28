import React, {useReducer, useContext, createContext} from 'react';
import store from 'store'

const EmptyState = {
    locations: [],
    locationSelectedOnMap: null
}

export const LocationsStateActions = {
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
        case LocationsStateActions.addLocation: 
            newState =  {...state, locations: [...state.locations, action.data]};
            break;
        case LocationsStateActions.removeLocation:
            var updatedLocations = state.locations.filter(l => l.id !== action.data.id) || [];
            newState = {...state, locations: updatedLocations};
            break;
        case LocationsStateActions.editLocation:
            var editedItemIndex = state.locations.findIndex(l => l.id === action.data.id);
            state.locations[editedItemIndex] = action.data;
            newState = {...state, locations: state.locations};
            break;
        case LocationsStateActions.selectOnMap:
            newState = {...state, locationSelectedOnMap: action.data};
            break;
        case LocationsStateActions.removeAllLocations:
            newState = {...state, locations: []};
            break;
        default:
            newState = state;    
            console.error(`[LocationsStatus] Action: "${action.type}" was not defined.`);
    }

    _storeLocations(newState);
    return newState;
}