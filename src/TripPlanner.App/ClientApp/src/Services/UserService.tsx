import { useEffect } from 'react';
import { Log, User, UserManager } from 'oidc-client';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useLoggerService from './Diagnostics/LoggerService';
import { appSettingsState, isUserSignedInState } from '../State/AppState';
import { userManagerState, userDataState } from '../State/UserState';

interface IUserService {
    signIn: () => void;
    signOut: () => void;
    getUser: () => User | undefined
    getToken: () => Promise<string>,
    isAuthenticated: () => boolean;
    finishAuthentication: () => void;
    initialize: (mng: UserManager) => Promise<void>,
    silentRefresh: () => void,
}

const useUserService = (): IUserService => {
  const userManager = useRecoilValue(userManagerState);
  const setUserSignedIn = useSetRecoilState(isUserSignedInState);
  const log = useLoggerService('UserService');
  const [userData, setUserData] = useRecoilState(userDataState);
  const appSettings = useRecoilValue(appSettingsState);

  const setupUser = (user: User) => {
    setUserSignedIn(true);
    setUserData(user);
  };

  const initialize = async (mng: UserManager) => new Promise<void>((resolve) => {
    mng.events.addUserLoaded((user) => {
      if (userData !== user) {
        setUserData(user);
      }
    });

    mng.events.addUserSignedOut(() => {
      userManager!.removeUser().then(() => {
        setUserData(undefined);
      });
    });

    mng.events.addAccessTokenExpiring(() => {
      userManager!.signinSilent().then(async () => {
        log.debug('signinSilent OK');
      }).catch((err) => {
        log.error('signinSilent Error', err);
      });
    });

    log.debug('Getting user...');
    mng.getUser().then((user) => {
      if (!!user && !user.expired) {
        log.debug('User signed in');
        setupUser(user);
      } else {
        mng.signinSilent().then((userSilent) => {
          log.debug('Token expired');
          setupUser(userSilent);
        }).catch((e) => {
          log.debug('Cannot get user.', e);
        });
      }
    }).finally(() => {
      resolve();
    });
  });

  const isAuthenticated = (): boolean => userData !== undefined;

  useEffect(() => {
    Log.logger = console;
  }, []);

  const signIn = (): void => {
    userManager!.signinRedirect();
  };

  const signOut = (): void => {
    userManager!.signoutRedirect().then(() => {
      setUserData(undefined);
    });
  };

  const finishAuthentication = (): void => {
    userManager!.signinRedirectCallback()
      .then(() => {
        // TODO redirect user to his previous location
        // in case his session ended and system required to signIn again
        window.location.assign(appSettings.appUrl);
      })
      .catch((error) => {
        log.error(`Redirect signin error ${error}`);
      });
  };

  const silentRefresh = (): void => {
    userManager!.signinSilentCallback()
      .catch((error) => {
        log.error(`Silent signin error: ${error}`);
      });
  };

  const getUser = (): User | undefined => {
    if (isAuthenticated()) {
      return userData!;
    }

    return undefined;
  };

  const getToken = () => new Promise<string>((resolve, reject) => {
    log.debug('Getting token...');
    userManager!.getUser().then((user) => {
      if (!!user && !user.expired) {
        log.debug('Token obtained');
        resolve(user.access_token);
      } else {
        reject();
      }
    });
  });

  return {
    signIn,
    signOut,
    getUser,
    getToken,
    isAuthenticated,
    finishAuthentication,
    initialize,
    silentRefresh,
  };
};

export default useUserService;
