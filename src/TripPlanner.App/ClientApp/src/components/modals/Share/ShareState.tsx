import React, { createContext, useContext, useReducer } from 'react';
import UserDto from '../../../Common/Dto/UserDto';

const enum ShareStateActions {
    setUsers,
}

type State = {
  usersToShare: UserDto[];
}

type Action =
    | { type: ShareStateActions.setUsers, data: UserDto[]; }

type Dispatch = (action: Action) => void;

const initialState: State = {
  usersToShare: [],
};

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  let newState: State = state;

  switch (action.type) {
    case ShareStateActions.setUsers:
      newState = { ...state, usersToShare: action.data };
      break;
    default:
      break;
  }

  return newState;
};

const ShareContext = createContext<{ state: State, dispatch: Dispatch}>({
  state: initialState,
  dispatch: () => undefined,
});

const useShareState = () => useContext(ShareContext);

type Props = {
    children: JSX.Element
}

function ShareStateProvider({ children }: Props) {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);

  return (
    <ShareContext.Provider value={{ state, dispatch }}>
      {children}
    </ShareContext.Provider>
  );
}

export { ShareStateActions, useShareState, ShareStateProvider };
