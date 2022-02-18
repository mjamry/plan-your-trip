import { atom, DefaultValue, selector } from 'recoil';
import { Notification } from '../Common/Dto/Notification';

const notificationsState = atom<Notification[]>({
  key: 'notificationsState',
  default: [],
});

const showNotificationState = selector<Notification[]>({
  key: 'notificationState.show',
  get: ({ get }) => get(notificationsState),
  set: ({ get, set }, value) => {
    const state = get(notificationsState);
    if (!(value instanceof DefaultValue)) {
      set(notificationsState, [...state, ...value]);
    }
  },
});

const hideNotificationState = selector<Notification[]>({
  key: 'notificationsState.hide',
  get: ({ get }) => get(notificationsState),
  set: ({ get, set }, value) => {
    const state = get(notificationsState);
    if (!(value instanceof DefaultValue)) {
      const updatedNotifications = state.filter((n) => value.some((n2) => n2.id !== n.id)) || [];
      set(notificationsState, updatedNotifications);
    }
  },
});

export { notificationsState, showNotificationState, hideNotificationState };
