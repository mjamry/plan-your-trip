import './Styles/App.css';
import './Styles/LocationsView.css';
import './Styles/LocationsViewMenu.css';
import './Styles/LocationViewRow.css';
import './Styles/LocationViewCard.css';
import './Styles/RatingButton.css';
import './Styles/Modal.css';
import './Styles/LocationEditForm.css';
import './Styles/SearchResult.css';
import './Styles/Header.css';
import './Styles/MapView.css';
import './Styles/AddNewLocationSelect.css';
import './Styles/Confirmation.css';
import './Styles/LoadingIndicator.css';
import './Styles/ToasterNotifications.css';
import './Styles/LocationActionLoadingIndicator.css';
import './Styles/DropDown.css';
import './Styles/PlanView.css';
import './Styles/AppLoader.css';
import './Styles/WelcomePage.css';
import './Styles/PlanDetailsForm.css';
import './Styles/PlansPage.css';

import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserManager } from 'oidc-client';
import LocationActionLoadingIndicator from './components/LocationActionLoadingIndicator';
import ModalContainer from './components/modals/ModalContainer';

import DashboardPage from './pages/DashboardPage';
import CallbackPage from './pages/CallbackPage';
import WelcomePage from './pages/WelcomePage';
import PlansPage from './pages/PlansPage';
import LocationsPage from './pages/LocationsPage';
import LabPlansPage from './pages/LabPlansPage';
import PlanDetailsPage from './pages/PlanDetailsPage';

import PageLayout from './pages/PageLayout';
import PrivateRoute from './components/PrivateRoute';
import useAppSettingsService from './Services/AppSettingsService';
import { UserStateActions, useUserState } from './State/UserState';
import useUserManagerConfigBuilder from './Common/UserManagerConfigBuilder';
import ErrorPage from './pages/ErrorPage';
import RouteTypes from './Common/RouteTypes';
import useUserService from './Services/UserService';
import { useAppState } from './State/AppState';
import useLoggerService from './Services/Diagnostics/LoggerService';

function App() {
  const appSettingsService = useAppSettingsService();
  const { dispatch: dispatchUserState } = useUserState();
  const configBuilder = useUserManagerConfigBuilder();
  const userService = useUserService();
  const { state: appState } = useAppState();
  const log = useLoggerService('AppInit');

  // eslint-disable-next-line no-promise-executor-return
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    async function init() {
      log.debug('Start init');
      log.debug('Get app settings');
      const settings = await appSettingsService.init();

      log.debug('Setup user manager');
      const mng = new UserManager(configBuilder.build(settings));
      await sleep(1000);
      // eslint-disable-next-line no-console
      console.log(mng);
      dispatchUserState({ type: UserStateActions.setupUserManager, data: mng });

      log.debug('Setup user');
      await userService.initializeUser();

      log.debug('End init');
      // appDispatch({ type: AppStateActions.setAppInitialized });
    }

    init();
  }, []);

  return (
    <>
      {appState.appInitialized
        ? (
          <div className="App">
            <LocationActionLoadingIndicator />
            <ModalContainer />
            <PageLayout>
              <Routes>
                <Route
                  path={RouteTypes.root}
                  element={(
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  )}
                />
                <Route
                  path={RouteTypes.plans}
                  element={(
                    <PrivateRoute>
                      <PlansPage />
                    </PrivateRoute>
                  )}
                />
                <Route
                  path={RouteTypes.plan}
                  element={(
                    <PrivateRoute>
                      <LocationsPage />
                    </PrivateRoute>
                  )}
                />
                <Route
                  path={RouteTypes.callback}
                  element={<CallbackPage />}
                />
                <Route
                  path={RouteTypes.welcome}
                  element={<WelcomePage />}
                />
                <Route
                  path={RouteTypes.labPlans}
                  element={(
                    <PrivateRoute>
                      <LabPlansPage />
                    </PrivateRoute>
                  )}
                />
                <Route
                  path={RouteTypes.labPlan}
                  element={(
                    <PrivateRoute>
                      <PlanDetailsPage />
                    </PrivateRoute>
                  )}
                />
                <Route
                  path={RouteTypes.error}
                  element={<ErrorPage />}
                />
              </Routes>
            </PageLayout>
          </div>
        )
      // TODO add proper loader here instead of this placeholder
        : 'LOADING'}
    </>
  );
}

export default App;
