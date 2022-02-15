import { useEffect } from 'react';
import { Log, User } from 'oidc-client';
import { useNavigate } from 'react-router-dom';
import useLoggerService from './Diagnostics/LoggerService';
import { useAppState, AppStateActions } from '../State/AppState';
import { UserStateActions, useUserState } from '../State/UserState';
import RouteTypes from '../Common/RouteTypes';

interface IUserService {
    signIn: () => void;
    signOut: () => void;
    getUser: () => User | undefined
    getToken: () => Promise<string>,
    isAuthenticated: () => boolean;
    finishAuthentication: () => void;
    initializeUser: () => Promise<void>,
}

const useUserService = (): IUserService => {
  const { dispatch: dispatchAppState } = useAppState();
  const navigate = useNavigate();
  const { state: userState, dispatch: userDispatch } = useUserState();

  const log = useLoggerService('UserService');

  const setupUser = (user: User) => {
    dispatchAppState({ type: AppStateActions.setUserSignedIn });
    userDispatch({ type: UserStateActions.setupUser, data: user });
  };

  const initializeUser = () => new Promise<void>((resolve, reject) => {
    log.debug('Getting user...');
    // eslint-disable-next-line no-console
    console.log(userState.userManager === undefined);
    userState.userManager?.getUser().then((user) => {
      if (!!user && !user.expired) {
        log.debug('User signed in');
        setupUser(user);
        resolve();
      } else {
        userState.userManager?.signinSilent().then((userSilent) => {
          log.debug('Token expired');
          setupUser(userSilent);
          resolve();
        }).catch((e) => {
          log.error('Cannot get user.', e);
          reject();
        });
      }
    });
  });

  const isAuthenticated = (): boolean => userState.currentUser !== undefined;

  useEffect(() => {
    Log.logger = console;
  }, []);

  const signIn = (): void => {
    userState.userManager?.signinRedirect();
  };

  const signOut = (): void => {
    userDispatch({ type: UserStateActions.clearUser });
    userState.userManager?.signoutRedirect();
  };

  const finishAuthentication = (): void => {
    userState.userManager?.signinRedirectCallback()
      .then(() => {
        // TODO redirect user to his previous location
        // in case his session ended and system required to signIn again
        navigate(RouteTypes.root);
      });
  };

  const getUser = (): User | undefined => {
    if (isAuthenticated()) {
      return userState.currentUser!;
    }

    return undefined;
  };

  const getToken = () => new Promise<string>((resolve, reject) => {
    log.debug('Getting token...');
    userState.userManager?.getUser().then((user) => {
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
    initializeUser,
  };
};

export default useUserService;
