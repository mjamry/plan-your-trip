import '../Styles/App.css';
import '../Styles/LocationsView.css';
import '../Styles/LocationsViewMenu.css';
import '../Styles/LocationViewRow.css';
import '../Styles/LocationViewCard.css';
import '../Styles/RatingButton.css';
import '../Styles/Modal.css';
import '../Styles/LocationEditForm.css';
import '../Styles/SearchResult.css';
import '../Styles/Header.css';
import '../Styles/MapView.css';
import '../Styles/AddNewLocationSelect.css';
import '../Styles/Confirmation.css';
import '../Styles/LoadingIndicator.css';
import '../Styles/ToasterNotifications.css';
import '../Styles/LocationActionLoadingIndicator.css';
import '../Styles/DropDown.css';
import '../Styles/PlanView.css';
import '../Styles/AppLoader.css';
import '../Styles/WelcomePage.css';
import '../Styles/PlanDetailsForm.css';
import '../Styles/PlansPage.css';

import React, { Route, Routes } from 'react-router-dom';

import DashboardPage from '../pages/DashboardPage';
import PlansPage from '../pages/PlansPage';
import LocationsPage from '../pages/LocationsPage';
import LabPlansPage from '../pages/LabPlansPage';
import PlanDetailsPage from '../pages/PlanDetailsPage';

import PageLayout from '../pages/PageLayout';
import ErrorPage from '../pages/ErrorPage';
import RouteTypes from '../Common/RouteTypes';
import CallbackPage from '../pages/CallbackPage';

function AuthenticatedApp() {
  return (
    <PageLayout>
      <Routes>
        <Route
          path={RouteTypes.root}
          element={<DashboardPage />}
        />
        <Route
          path={RouteTypes.callback}
          element={<CallbackPage />}
        />
        <Route
          path={RouteTypes.plans}
          element={<PlansPage />}
        />
        <Route
          path={RouteTypes.plan}
          element={<LocationsPage />}
        />
        <Route
          path={RouteTypes.labPlans}
          element={<LabPlansPage />}
        />
        <Route
          path={RouteTypes.labPlan}
          element={<PlanDetailsPage />}
        />
        <Route
          path={RouteTypes.error}
          element={<ErrorPage />}
        />
      </Routes>
    </PageLayout>
  );
}

export default AuthenticatedApp;
