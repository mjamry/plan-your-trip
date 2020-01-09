import React, { useReducer, useContext, createContext } from 'react';
import store from 'store'

export { EmptyState, LocationsStateActions, LocationsStateContext, LocationsStateProvider, useLocationsState, _defaultReducer }

const EmptyState = {
    locations: [],
    locationSelectedOnMap: null
}

const LocationsStateActions = {
    addLocation: 'addLocation',
    removeLocation: 'removeLocation',
    editLocation: 'editLocation',
    selectOnMap: 'selectOnMap',
    removeAllLocations: 'removeAllLocations',
    loadLocations: 'loadLocations'
}

const LocationsStateContext = createContext();

const LocationsStateProvider = ({ children, reducerHook }) => {
    const value = reducerHook || useReducer(reducerHook, EmptyState);
    return (
        <LocationsStateContext.Provider value={value}>
            {children}
        </LocationsStateContext.Provider>
    )
}

var useLocationsState = () => useContext(LocationsStateContext);

var _storeLocations = (state) => {
    store.set('locationsState', state);
}

var _restoreLocations = () => {
    return store.get('locationsState', EmptyState);
}

var _defaultReducer = (state, action) => {
    var newState = {};

    switch (action.type) {
        case LocationsStateActions.addLocation:
            newState = { ...state, locations: [...state.locations, action.data] };
            break;
        case LocationsStateActions.removeLocation:
            var updatedLocations = state.locations.filter(l => l.id !== action.data.id) || [];
            newState = { ...state, locations: updatedLocations };
            break;
        case LocationsStateActions.editLocation:
            var editedItemIndex = state.locations.findIndex(l => l.id === action.data.id);
            state.locations[editedItemIndex] = action.data;
            newState = { ...state, locations: [...state.locations] };
            break;
        case LocationsStateActions.selectOnMap:
            newState = { ...state, locationSelectedOnMap: action.data };
            break;
        case LocationsStateActions.removeAllLocations:
            newState = { ...state, locations: [] };
            break;
        case LocationsStateActions.loadLocations:
            newState = { ...state, locations: action.data };
            break;
        default:
            newState = state;
            console.error(`[LocationsStatus] Action: "${action.type}" was not defined.`);
    }

    //_storeLocations(newState);
    return newState;
}