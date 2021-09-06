import React, { useReducer, useContext, createContext } from 'react';
import { Location } from '../Common/Dto/Location';

const enum LocationsStateActions {
  addLocation,
  removeLocation,
  editLocation,
  selectOnMap,
  removeAllLocations,
  loadLocations,
  isLoading,
}

type State = {
  locations: Location[],
  locationSelectedOnMap?: Location,
  isLoading: boolean,
}

type Action =
  | { type: LocationsStateActions.addLocation, data: Location }
  | { type: LocationsStateActions.removeLocation, data: Location }
  | { type: LocationsStateActions.editLocation, data: Location }
  | { type: LocationsStateActions.selectOnMap, data: Location }
  | { type: LocationsStateActions.removeAllLocations }
  | { type: LocationsStateActions.loadLocations, data: Location[] }
  | { type: LocationsStateActions.isLoading, data: boolean }

type Dispatch = (action: Action) => void;

const initialState: State = {
  locations: [],
  locationSelectedOnMap: undefined,
  isLoading: false,
};

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  let newState: State = state;

  switch (action.type) {
    case LocationsStateActions.addLocation:
      newState = { ...state, locations: [...state.locations, action.data] };
      break;
    case LocationsStateActions.removeLocation:
      const updatedLocations = state.locations.filter((l) => l.id !== action.data.id) || [];
      newState = { ...state, locations: updatedLocations };
      break;
    case LocationsStateActions.editLocation:
      const editedItemIndex = state.locations.findIndex((l) => l.id === action.data.id);
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
      break;
  }

  return newState;
};

const LocationsStateContext = createContext<{ state: State, dispatch: Dispatch }>(
  {
    state: initialState,
    dispatch: () => undefined
  }
);
const useLocationsState = () => useContext(LocationsStateContext);

type Props = {
  children: JSX.Element
}

const LocationsStateProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(reducer, initialState);
  return <LocationsStateContext.Provider value={{ state, dispatch }}>
    {children}
  </LocationsStateContext.Provider>
}

export { LocationsStateProvider, LocationsStateActions, useLocationsState };
