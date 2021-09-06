import React, { createContext, useContext, useReducer } from 'react';
import { List } from '../Common/Dto/List';

const enum ListViewType {
  grid,
  list,
}

const enum ListsStateActions {
  selectList,
  loadLists,
  setView,
  addList,
  editList,
  removeList,
  isLoading,
}

type State = {
  lists: List[],
  selectedListId: number,
  view: ListViewType,
  isLoading: boolean,
}

type Action =
  | { type: ListsStateActions.selectList, data: number }
  | { type: ListsStateActions.loadLists, data: List[] }
  | { type: ListsStateActions.removeList, data: List }
  | { type: ListsStateActions.editList, data: List }
  | { type: ListsStateActions.addList, data: List }
  | { type: ListsStateActions.setView, data: ListViewType }
  | { type: ListsStateActions.isLoading, data: boolean }

type Dispatch = (action: Action) => void;

const initialState: State = {
  lists: [],
  selectedListId: 0,
  view: ListViewType.grid,
  isLoading: false,
};

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  let newState: State = state;

  switch (action.type) {
    case ListsStateActions.selectList:
      newState = { ...state, selectedListId: action.data };
      break;
    case ListsStateActions.loadLists:
      newState = { ...state, lists: action.data };
      break;
    case ListsStateActions.removeList:
      const updatedLists = state.lists.filter((l) => l.id !== action.data.id) || [];
      newState = { ...state, lists: updatedLists, selectedListId: updatedLists[0].id };
      break;
    case ListsStateActions.editList:
      const editedItemIndex = state.lists.findIndex((l) => l.id === action.data.id);
      state.lists[editedItemIndex] = action.data;
      newState = { ...state, lists: [...state.lists] };
      break;
    case ListsStateActions.addList:
      newState = { ...state, lists: [...state.lists, action.data] };
      break;
    case ListsStateActions.setView:
      newState = { ...state, view: action.data };
      break;
    case ListsStateActions.isLoading:
      newState = { ...state, isLoading: action.data };
      break;
    default:
      break;
  }

  return newState;
};

const ListStateContext = createContext<{state: State, dispatch: Dispatch}>(
  {
    state: initialState,
    dispatch: () => undefined,
  },
);

const useListsState = () => useContext(ListStateContext);

type Props = {
  children: JSX.Element
}

const ListsStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);

  return (
    <ListStateContext.Provider value={{ state, dispatch }}>
      {children}
    </ListStateContext.Provider>
  );
};

export {
  ListsStateProvider, ListsStateActions, useListsState, ListViewType,
};
