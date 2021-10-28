import { UserManager } from 'oidc-client';
import * as React from 'react';

const enum UserStateActions {
  setupUserManager,
}

type State = {
  userManager?: UserManager
}

type Action =
  | { type: UserStateActions.setupUserManager, data: UserManager }

type Dispatch = (action: Action) => void

const initialState: State = {
  userManager: undefined,
};

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case UserStateActions.setupUserManager:
      if (!state.userManager) {
        console.log(`USER STATE: ${new Date()} ${action}`);
        state = { ...state, userManager: action.data };
      }
      break;
    default:
      break;
  }

  return state;
};

const UserContext = React.createContext<{state: State, dispatch: Dispatch}>(
  {
    state: initialState,
    dispatch: () => undefined,
  },
);

const useUserState = () => React.useContext(UserContext);

type Props = {
    children: JSX.Element
}

const UserStateProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserStateProvider, UserStateActions, useUserState };
