import React, {
  createContext, useContext, useMemo, useReducer,
} from 'react';
import { Notification, DefaultNotificationTimeout, NotificationType } from '../Common/Dto/Notification';

const enum NotificationsActions {
  show,
  hide,
}

type State = {
  notifications: Notification[];
}

type Action =
  | { type: NotificationsActions.show, notificationType: NotificationType, data: any }
  | { type: NotificationsActions.hide, data: any }

type Dispatch = (action: Action) => void;

const initialState: State = {
  notifications: [],
};

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case NotificationsActions.show:
      state = {
        ...state,
        notifications:
        [
          ...state.notifications,
          new Notification(action.notificationType, action.data, DefaultNotificationTimeout),
        ],
      };
      break;
    case NotificationsActions.hide:
      const updatedNotifications = state.notifications.filter((n) => n.id !== action.data) || [];
      state = { ...state, notifications: updatedNotifications };
      break;
    default:
      break;
  }

  return state;
};

const NotificationStateContext = createContext<{ state: State, dispatch: Dispatch }>(
  {
    state: initialState,
    dispatch: () => undefined,
  },
);
const useNotificationState = () => useContext(NotificationStateContext);

type Props = {
  children: JSX.Element[]
}

function NotificationStateProvider({ children }: Props) {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);

  const value = useMemo<{state: State, dispatch: Dispatch}>(() => ({ state, dispatch }), [state]);

  return (
    <NotificationStateContext.Provider value={value}>
      {children}
    </NotificationStateContext.Provider>
  );
}

export {
  NotificationStateProvider, NotificationsActions, useNotificationState,
};
