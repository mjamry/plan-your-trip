import { AppSettings } from './Dto/AppSettings';

type IUserManagerConfigBuilder = {
    build: (settings: AppSettings) => object;
}

const useUserManagerConfigBuilder = (): IUserManagerConfigBuilder => {
  const build = (settings: AppSettings) => ({
    authority: settings.authUrl,
    client_id: 'js',
    redirect_uri: `${settings.appUrl}/callback`,
    response_type: 'id_token token',
    scope: 'openid profile email trip_planner',
    post_logout_redirect_uri: settings.appUrl,
  });

  return {
    build,
  };
};

export default useUserManagerConfigBuilder;
