import React, { createContext, useContext, useReducer } from 'react';

const enum ModalTypes {
  addLocation,
  editLocation,
  loading,
  removeLocation,
  addList,
  editList,
  removeList,
}

const enum ModalStateAction {
  show,
  hide,
  update,
}

type State = {
  type?: ModalTypes;
  isVisible: boolean;
  data?: any
}

type Action =
  | { type: ModalStateAction.show, data: any, modalType: ModalTypes }
  | { type: ModalStateAction.hide }
  | { type: ModalStateAction.update, data: any }

type Dispatch = (action: Action) => void;

const initialState: State = {
  type: undefined,
  isVisible: false,
  data: undefined,
};

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  let newState: State = state;

  switch (action.type) {
    case ModalStateAction.show:
      newState = {
        ...state, data: action.data, type: action.modalType, isVisible: true,
      };
      break;
    case ModalStateAction.hide:
      newState = { data: undefined, type: undefined, isVisible: false };
      break;
    case ModalStateAction.update:
      newState = { ...state, data: action.data };
      break;
    default:
      break;
  }

  return newState;
};

const ModalContext = createContext<{ state: State, dispatch: Dispatch }>(
  {
    state: initialState,
    dispatch: () => undefined,
  },
);
const useModalState = () => useContext(ModalContext);

type Props = {
  children: JSX.Element
}

const ModalStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export {
  ModalStateProvider, useModalState, ModalTypes, ModalStateAction,
};
