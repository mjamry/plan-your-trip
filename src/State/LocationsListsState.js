import React, {createContext, useContext, useReducer} from 'react'


const LocationsListsStateActions = {
    selectList: 'selectList',
    loadLists: 'loadLists'
}

const LocationsListsState = {
    lists: [],
    selectedListId: 2
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
        default: 
            var newState = state;
            break;
    }

    return newState;
}

export default LocationsListsStateProvider;
export {LocationsListStateContext, LocationsListsStateProvider, LocationsListsStateActions, useLocationsListsState}