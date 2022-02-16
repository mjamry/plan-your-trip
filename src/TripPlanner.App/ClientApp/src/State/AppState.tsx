import { atom } from 'recoil';
import { AppSettings } from '../Common/Dto/AppSettings';

const userSignedInState = atom<boolean>({
  key: 'appState.userSignedIn',
  default: false,
});

const appInitializedState = atom<boolean>({
  key: 'appState.appInitialized',
  default: false,
});

const appSettingsState = atom<AppSettings>({
  key: 'appState.appSettings',
  default: {} as AppSettings,
});

export { userSignedInState, appInitializedState, appSettingsState };
