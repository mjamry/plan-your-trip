import * as React from 'react';
import { AppSettings } from '../Common/Dto/AppSettings';

const enum AppStateActions {
  setUserSignedIn = 1,
  setAppInitialized,
  setAppSettings,
}

type State = {
  userSignedIn: boolean;
  appInitialized: boolean;
  appSettings: AppSettings;
}

type Action =
  | { type: AppStateActions.setUserSignedIn }
  | { type: AppStateActions.setAppInitialized }
  | { type: AppStateActions.setAppSettings, data: AppSettings }

type Dispatch = (action: Action) => void

const initialState: State = {
  userSignedIn: false,
  appInitialized: false,
  appSettings: {} as AppSettings,
};

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case AppStateActions.setUserSignedIn:
      state = { ...state, userSignedIn: true };
      break;
    case AppStateActions.setAppInitialized:
      state = { ...state, appInitialized: true };
      break;
    case AppStateActions.setAppSettings:
      state = { ...state, appSettings: action.data };
      break;
    default:
      break;
  }

  return state;
};

const AppContext = React.createContext<{state: State, dispatch: Dispatch}>(
  {
    state: initialState,
    dispatch: () => undefined,
  },
);

const useAppState = () => React.useContext(AppContext);

type Props = {
    children: JSX.Element
}

const AppStateProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppStateProvider, AppStateActions, useAppState };
