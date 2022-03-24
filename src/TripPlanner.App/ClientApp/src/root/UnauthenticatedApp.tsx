import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RouteTypes from '../Common/RouteTypes';
import CallbackPage from '../pages/CallbackPage';
import WelcomePage from '../pages/WelcomePage';

function UnauthenticatedApp() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(RouteTypes.root, { replace: true });
  }, []);

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
      </Routes>
    </>
  );
}

export default UnauthenticatedApp;
