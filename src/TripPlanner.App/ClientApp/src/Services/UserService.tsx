import { useEffect } from 'react';
import { Log, User } from 'oidc-client';
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
    initializeUser: () => Promise<void>,
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

  const initializeUser = () => new Promise<void>((resolve, reject) => {
    log.debug('Getting user...');
    // eslint-disable-next-line no-console
    console.log(userManager === undefined);
    userManager?.getUser().then((user) => {
      if (!!user && !user.expired) {
        log.debug('User signed in');
        setupUser(user);
        resolve();
      } else {
        userManager?.signinSilent().then((userSilent) => {
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

  const isAuthenticated = (): boolean => userData !== undefined;

  useEffect(() => {
    Log.logger = console;
  }, []);

  const signIn = (): void => {
    userManager?.signinRedirect();
  };

  const signOut = (): void => {
    userManager?.signoutRedirect();
    setUserData(undefined);
    userManager?.signoutRedirect();
  };

  const finishAuthentication = (): void => {
    userManager?.signinRedirectCallback()
      .then(() => {
        // TODO redirect user to his previous location
        // in case his session ended and system required to signIn again
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
    userManager?.getUser().then((user) => {
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
