import { AppSettings } from './Dto/AppSettings';

type IUserManagerConfigBuilder = {
    build: (settings: AppSettings) => object;
}

const useUserManagerConfigBuilder = (): IUserManagerConfigBuilder => {
  const build = (settings: AppSettings) => ({
    authority: settings.authUrl,
    client_id: 'SpaClient',
    redirect_uri: `${settings.appUrl}/callback`,
    response_type: 'id_token token',
    scope: 'openid profile email trip_planner',
    post_logout_redirect_uri: settings.appUrl,
    silent_redirect_uri: `${settings.appUrl}/assets/silent-refresh.html`,
    automaticSilentRenew: true,
  });

  return {
    build,
  };
};

export default useUserManagerConfigBuilder;
