import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RouteTypes from '../Common/RouteTypes';
import CallbackPage from '../pages/CallbackPage';
import SilentRefreshPage from '../pages/SilentRefreshPage';
import WelcomePage from '../pages/WelcomePage';

function UnauthenticatedApp() {
  return (
    <>
      <Routes>
        <Route
          path={RouteTypes.root}
          element={<WelcomePage />}
        />
        <Route
          path={RouteTypes.welcome}
          element={<WelcomePage />}
        />
        <Route
          path={RouteTypes.callback}
          element={<CallbackPage />}
        />
        <Route
          path={RouteTypes.silentRefresh}
          element={<SilentRefreshPage />}
        />
      </Routes>
    </>
  );
}

export default UnauthenticatedApp;
