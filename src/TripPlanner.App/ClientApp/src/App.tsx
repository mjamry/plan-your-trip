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

import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
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

const App = () => {
  const appSettingsService = useAppSettingsService();
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const { dispatch: dispatchUserState } = useUserState();
  const configBuilder = useUserManagerConfigBuilder();

  useEffect(() => {
    appSettingsService.init().then((settings) => {
      const mng = new UserManager(configBuilder.build(settings));
      dispatchUserState({ type: UserStateActions.setupUserManager, data: mng });

      setIsAppLoaded(true);
    });
  }, []);

  return (
    <>
      {isAppLoaded
        ? (
          <div className="App">
            <LocationActionLoadingIndicator />
            <ModalContainer />
            <PageLayout>
              <PrivateRoute path="/" exact component={DashboardPage} />
              <PrivateRoute path="/locations" exact component={PlansPage} />
              <PrivateRoute path="/locations/:id" component={LocationsPage} />
              <Route path="/callback" component={CallbackPage} />
              <Route path="/welcome" component={WelcomePage} />
              <PrivateRoute path="/plans" exact component={LabPlansPage} />
              <PrivateRoute path="/plans/:id" component={PlanDetailsPage} />
              <Route path="/error/:code" component={ErrorPage} />
            </PageLayout>
          </div>
        )
      // TODO add proper loader here instead of this placeholder
        : 'LOADING'}
    </>
  );
};

export default App;
