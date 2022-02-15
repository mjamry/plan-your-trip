import { User, UserManager } from 'oidc-client';
import * as React from 'react';
import { useMemo } from 'react';

const enum UserStateActions {
  setupUserManager,
  setupUser,
  clearUser,
}

type State = {
  userManager?: UserManager,
  currentUser?: User,
}

type Action =
  | { type: UserStateActions.setupUserManager, data: UserManager }
  | { type: UserStateActions.setupUser, data: User }
  | { type: UserStateActions.clearUser }

type Dispatch = (action: Action) => void

const initialState: State = {
  userManager: undefined,
  currentUser: undefined,
};

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case UserStateActions.setupUserManager:
      if (!state.userManager) {
        // eslint-disable-next-line no-console
        console.log(action.data);
        state = { ...state, userManager: action.data };
      }
      break;
    case UserStateActions.setupUser:
      state = { ...state, currentUser: action.data };
      break;
    case UserStateActions.clearUser:
      state = { ...state, currentUser: undefined };
      break;
    default:
      break;
  }

  // eslint-disable-next-line no-console
  console.log(`User state: ${state.userManager === undefined}`);
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

function UserStateProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(reducer, initialState);

  const value = useMemo<{state: State, dispatch: Dispatch}>(() => ({ state, dispatch }), [state]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export { UserStateProvider, UserStateActions, useUserState };
