import { useEffect, useState } from 'react';
import { Log, User, UserManager } from 'oidc-client';
import { useHistory } from 'react-router-dom';
import useLoggerService from './Diagnostics/LoggerService';
import { useAppState, AppStateActions } from '../State/AppState';

const GET_USER_TIMEOUT = 5000;

interface IUserService {
    signIn: () => void;
    signOut: () => void;
    getUser: () => Promise<User>;
    getToken: () => Promise<string>,
    isAuthenticated: () => Promise<boolean>;
    signInRedirectCallback: () => Promise<User>;
}

const useUserService = (): IUserService => {
  const { dispatch: dispatchAppState } = useAppState();
  const history = useHistory();

  // //TODO - use these configurable values instead of hardcoded ones
  // const config2 = {
  //   authority: appState.appSettings.authUrl,
  //   client_id: 'js',
  //   redirect_uri: `${appState.appSettings.appUrl}/callback`,
  //   response_type: 'id_token token',
  //   scope: 'openid profile email trip_planner',
  //   post_logout_redirect_uri: appState.appSettings.appUrl,
  // };

  const config = {
    authority: 'http://localhost:50000',
    client_id: 'js',
    redirect_uri: 'http://localhost:3000/callback',
    response_type: 'id_token token',
    scope: 'openid profile email trip_planner',
    post_logout_redirect_uri: 'http://localhost:3000',
  };

  const [userManager] = useState(new UserManager(config));
  const log = useLoggerService('UserService');

  useEffect(() => {
    // TODO debug only
    Log.logger = console;
  }, []);

  const signIn = (): void => {
    userManager.signinRedirect();
  };

  const signOut = (): void => {
    userManager.signoutRedirect();
  };

  const signInRedirectCallback = (): Promise<User> => userManager.signinRedirectCallback();

  const getUser = (): Promise<User> => new Promise<User>((resolve, reject) => {
    log.debug('Getting user...');
    const getUserTimeout = setTimeout(signIn, GET_USER_TIMEOUT);
    userManager.getUser()
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
          history.push('/welcome');
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
          userManager.signinSilent();
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
    signInRedirectCallback,
  };
};

export default useUserService;
