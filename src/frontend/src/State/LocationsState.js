import React, { useReducer, useContext, createContext } from 'react';
import store from 'store'
import useLoggerService from '../Services/Diagnostics/LoggerService'

const EmptyState = {
    locations: [],
    locationSelectedOnMap: null,
    isLoading: false
}

const LocationsStateActions = {
    addLocation: 'addLocation',
    removeLocation: 'removeLocation',
    editLocation: 'editLocation',
    selectOnMap: 'selectOnMap',
    removeAllLocations: 'removeAllLocations',
    loadLocations: 'loadLocations',
    isLoading: 'isLoading'
}

const LocationsStateContext = createContext();

const LocationsStateProvider = ({ children }) => {
    return (
        <LocationsStateContext.Provider value={useReducer(_defaultReducer, EmptyState)}>
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
    var logger = useLoggerService();

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
        case LocationsStateActions.isLoading:
            newState = { ...state, isLoading: action.data };
            break;
        default:
            newState = state;
            logger.debug(`[LocationsStatus] Action: "${action.type}" was not defined.`);
    }

    //_storeLocations(newState);
    return newState;
}

export { EmptyState, LocationsStateActions, LocationsStateContext, LocationsStateProvider, useLocationsState, _defaultReducer }