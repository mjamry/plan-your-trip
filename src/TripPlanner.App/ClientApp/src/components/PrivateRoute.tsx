import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import useUserService from '../Services/UserService';

/* eslint-disable react/jsx-props-no-spreading */

const PrivateRoute = ({ ...props }) => {
  //TODO take look if this component is really needed
  const userService = useUserService();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    async function getAuth() {
      const isAuth = await userService.isAuthenticated();
      setIsAuthenticated(isAuth);
    }

    getAuth();
  },
  []);

  return (
    <>
      {isAuthenticated && <Route {...props} />}
    </>
  );
};

export default PrivateRoute;
