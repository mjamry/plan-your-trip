import React, {createContext, useContext, useReducer} from 'react'
import { LocationFormStateActions } from '../components/modals/LocationDetailsForm/LocationDetailsFormState';

const ListViewType = {
    grid: 'grid',
    list: 'list'
}

const ListsStateActions = {
    selectList: 'selectList',
    loadLists: 'loadLists',
    setView: 'setView',
    addList: 'addList',
    editList: 'editList',
    removeList: 'removeList',
    isLoading: 'isLoading'
}

const ListsState = {
    lists: [],
    selectedListId: 0,
    view: ListViewType.grid,
    isLoading: false
}

const ListStateContext = createContext();

const ListsStateProvider = ({children}) => {
    return (
        <ListStateContext.Provider value={useReducer(_reducer, ListsState)}>
            {children}
        </ListStateContext.Provider>
    )
}

var useListsState = () => useContext(ListStateContext);

const _reducer = (state, action) => {
    switch(action.type){
        case ListsStateActions.selectList:
            var newState = {...state, selectedListId: action.data}
            break;
        case ListsStateActions.loadLists:
            var newState = {...state, lists: action.data}
            break;
        case ListsStateActions.removeList:
            var updatedLists = state.lists.filter(l => l.id !== action.data.id) || [];
            newState = { ...state, lists: updatedLists, selectedListId: updatedLists[0].id };
            break;
        case ListsStateActions.editList: 
            var editedItemIndex = state.lists.findIndex(l => l.id === action.data.id);
            state.lists[editedItemIndex] = action.data;
            newState = { ...state, lists: [...state.lists] };
            break;
        case ListsStateActions.addList:
            newState = { ...state, lists: [...state.lists, action.data] };
            break;
        case ListsStateActions.setView:
            var newState = {...state, view: action.data}
            break;
        case ListsStateActions.isLoading:
            newState = { ...state, isLoading: action.data };
            break;
        default: 
            var newState = state;
            break;
    }

    return newState;
}

export default ListsStateProvider;
export {ListStateContext, ListsStateProvider, ListsStateActions, useListsState, ListViewType}