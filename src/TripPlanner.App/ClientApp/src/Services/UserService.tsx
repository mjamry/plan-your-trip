import { useEffect } from 'react';
import { Log, User, UserManager } from 'oidc-client';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useLoggerService from './Diagnostics/LoggerService';
import { userSignedInState } from '../State/AppState';
import { userManagerState, userDataState } from '../State/UserState';
import RouteTypes from '../Common/RouteTypes';

interface IUserService {
    signIn: () => void;
    signOut: () => void;
    getUser: () => User | undefined
    getToken: () => Promise<string>,
    isAuthenticated: () => boolean;
    finishAuthentication: () => void;
    initialize: (mng: UserManager) => Promise<void>,
}

const useUserService = (): IUserService => {
  const navigate = useNavigate();
  const userManager = useRecoilValue(userManagerState);
  const setUserSignedIn = useSetRecoilState(userSignedInState);
  const log = useLoggerService('UserService');
  const [userData, setUserData] = useRecoilState(userDataState);

  const setupUser = (user: User) => {
    setUserSignedIn(true);
    setUserData(user);
  };

  const initialize = async (mng: UserManager) => {
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
    });
  };

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
        // eslint-disable-next-line no-console
        console.log('SigninRedirect');
        navigate(RouteTypes.root);
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
  };
};

export default useUserService;
