import { UserManager } from 'oidc-client';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import makeStyles from '@mui/styles/makeStyles';
import useUserManagerConfigBuilder from '../Common/UserManagerConfigBuilder';
import Loader from '../components/Loader';
import useAppSettingsService from '../Services/AppSettingsService';
import useLoggerService from '../Services/Diagnostics/LoggerService';
import useUserService from '../Services/UserService';
import { isAppLoadedState } from '../State/AppState';
import { userManagerState } from '../State/UserState';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function AppLoader() {
  const log = useLoggerService('AppLoader');
  const appSettingsService = useAppSettingsService();
  const setUserManager = useSetRecoilState(userManagerState);
  const configBuilder = useUserManagerConfigBuilder();
  const userService = useUserService();
  const setIsAppInitialized = useSetRecoilState(isAppLoadedState);
  const classes = useStyles();

  useEffect(() => {
    async function init() {
      setIsAppInitialized(false);
      log.info('Start init');
      log.info('Get app settings');
      const settings = await appSettingsService.init();

      log.info('Setup user manager');
      const mng = new UserManager(configBuilder.build(settings));
      setUserManager(mng);

      log.info('Setup user');
      userService.initialize(mng)
        .then(() => {
          log.debug('User loaded');
        })
        .catch(() => {
          log.debug('No user');
        })
        .finally(() => {
          log.info('End init');
          setIsAppInitialized(true);
        });
    }

    init();
  }, []);

  return (
    <div className={classes.root}>
      <Loader />
    </div>
  );
}

export default AppLoader;
