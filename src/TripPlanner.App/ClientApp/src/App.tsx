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

import React, { Route, Routes } from 'react-router-dom';
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
import ErrorPage from './pages/ErrorPage';
import RouteTypes from './Common/RouteTypes';

function App() {
  return (
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
  );
}

export default App;
