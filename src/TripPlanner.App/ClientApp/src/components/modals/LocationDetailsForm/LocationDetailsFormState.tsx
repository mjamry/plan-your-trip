import React, { createContext, useContext, useReducer } from 'react';
import LocationDto, { LocationEmpty } from '../../../Common/Dto/LocationDto';

const enum LocationFormStateActions {
    setStep,
    updateLocation,
    setError,
    clearError
}

type Error = {
  [name: string]: string;
}

type State = {
    step: number;
    location: LocationDto;
    errors?: Error;
}

type Action =
    | { type: LocationFormStateActions.setStep, data: number }
    | { type: LocationFormStateActions.updateLocation, data: LocationDto }
    | { type: LocationFormStateActions.clearError, data: Error }
    | { type: LocationFormStateActions.setError, data: Error }

type Dispatch = (action: Action) => void;

const initialState: State = {
  step: 0,
  location: LocationEmpty,
  errors: undefined,
};

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  let newState: State = state;

  switch (action.type) {
    case LocationFormStateActions.setError:
      newState = { ...state, errors: { ...state.errors, [action.data.name]: action.data.value } };
      break;
    case LocationFormStateActions.clearError:
      newState = { ...state, errors: { ...state.errors, [action.data.name]: '' } };
      break;
    case LocationFormStateActions.updateLocation:
      newState = { ...state, location: action.data };
      break;
    case LocationFormStateActions.setStep:
      newState = { ...state, step: action.data };
      break;
    default:
      break;
  }

  return newState;
};

const LocationFormContext = createContext<{ state: State, dispatch: Dispatch}>({
  state: initialState,
  dispatch: () => undefined,
});

const useLocationFormState = () => useContext(LocationFormContext);

type Props = {
    children: JSX.Element
}

function LocationFormStateProvider({ children }: Props) {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);

  return (
    <LocationFormContext.Provider value={{ state, dispatch }}>
      {children}
    </LocationFormContext.Provider>
  );
}

export { LocationFormStateActions, useLocationFormState, LocationFormStateProvider };
