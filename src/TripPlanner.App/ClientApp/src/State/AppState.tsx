import { atom } from 'recoil';
import { AppSettings } from '../Common/Dto/AppSettings';

const userSignedInState = atom<boolean>({
  key: 'appState.userSignedIn',
  default: false,
});

const isAppLoadedState = atom<boolean>({
  key: 'appState.isAppLoaded',
  default: false,
});

const appSettingsState = atom<AppSettings>({
  key: 'appState.appSettings',
  default: {} as AppSettings,
});

export { userSignedInState, isAppLoadedState, appSettingsState };
