import { useEffect } from 'react';
import { Log, User } from 'oidc-client';
import { useNavigate } from 'react-router-dom';
import useLoggerService from './Diagnostics/LoggerService';
import { useAppState, AppStateActions } from '../State/AppState';
import { useUserState } from '../State/UserState';

const GET_USER_TIMEOUT = 5000;

interface IUserService {
    signIn: () => void;
    signOut: () => void;
    getUser: () => Promise<User>;
    getToken: () => Promise<string>,
    isAuthenticated: () => Promise<boolean>;
    finishAuthentication: () => void;
}

const useUserService = (): IUserService => {
  const { dispatch: dispatchAppState } = useAppState();
  const navigate = useNavigate();
  const { state: userState } = useUserState();

  const log = useLoggerService('UserService');

  useEffect(() => {
    // TODO debug only
    Log.logger = console;
  }, []);

  const signIn = (): void => {
    userState.userManager?.signinRedirect();
  };

  const signOut = (): void => {
    userState.userManager?.signoutRedirect();
  };

  const finishAuthentication = (): void => {
    userState.userManager?.signinRedirectCallback()
      .then(() => {
        navigate('/');
      }).catch((e) => {
        log.error('Error while signing in an user: ', e);
      });
  };

  const getUser = (): Promise<User> => new Promise<User>((resolve, reject) => {
    log.debug('Getting user...');
    const getUserTimeout = setTimeout(signIn, GET_USER_TIMEOUT);
    userState.userManager?.getUser()
      .then((user) => {
        clearTimeout(getUserTimeout);
        if (user) {
          if (user.expired) {
            log.debug('Token expired');
            signIn();
          }
          log.debug('User signed in');
          dispatchAppState({ type: AppStateActions.setUserSignedIn });

          resolve(user);
        } else {
          log.debug('No user');
          navigate('/welcome');
          reject();
        }
      })
      .catch(() => {
        log.error('Error while obtaining user data');
        reject();
      });
  });

  const getToken = (): Promise<string> => new Promise<string>((resolve, reject) => {
    log.debug('Getting token...');
    getUser()
      .then((user) => {
        if (user.access_token) {
          log.debug('Token obtained');
          resolve(user.access_token);
        } else {
          log.debug('Silent signin');
          userState.userManager?.signinSilent();
        }
      })
      .catch(() => {
        log.debug('Error while obtaining user token');
        reject();
      });
  });

  const isAuthenticated = async (): Promise<boolean> => {
    const user = await getUser();
    if (user) {
      return true;
    }

    return false;
  };

  return {
    signIn,
    signOut,
    getUser,
    getToken,
    isAuthenticated,
    finishAuthentication,
  };
};

export default useUserService;
