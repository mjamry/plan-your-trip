import React, {createContext, useContext, useReducer} from 'react'
import { LocationFormStateActions } from '../components/modals/LocationDetailsForm/LocationDetailsFormState';

const LocationListViewType = {
    grid: 'grid',
    list: 'list'
}

const LocationsListsStateActions = {
    selectList: 'selectList',
    loadLists: 'loadLists',
    setView: 'setView'
}

const LocationsListsState = {
    lists: [],
    selectedListId: 2,
    view: LocationListViewType.grid
}

const LocationsListStateContext = createContext();

const LocationsListsStateProvider = ({children}) => {
    return (
        <LocationsListStateContext.Provider value={useReducer(_reducer, LocationsListsState)}>
            {children}
        </LocationsListStateContext.Provider>
    )
}

var useLocationsListsState = () => useContext(LocationsListStateContext);

const _reducer = (state, action) => {
    switch(action.type){
        case LocationsListsStateActions.selectList:
            var newState = {...state, selectedListId: action.data}
            break;
        case LocationsListsStateActions.loadLists:
            var newState = {...state, lists: action.data}
            break;
        case LocationsListsStateActions.setView:
            var newState = {...state, view: action.data}
            break;
        default: 
            var newState = state;
            break;
    }

    return newState;
}

export default LocationsListsStateProvider;
export {LocationsListStateContext, LocationsListsStateProvider, LocationsListsStateActions, useLocationsListsState, LocationListViewType}