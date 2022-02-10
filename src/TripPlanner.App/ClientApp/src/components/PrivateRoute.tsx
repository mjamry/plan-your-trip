import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useUserService from '../Services/UserService';

/* eslint-disable react/jsx-props-no-spreading */

type Props = {
  children: JSX.Element,
}

function PrivateRoute(props: Props) {
  const { children } = props;

  const userService = useUserService();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(
    () => {
      async function getAuth() {
        const isAuth = await userService.isAuthenticated();
        setIsAuthenticated(isAuth);
      }

      getAuth();
    },
    [],
  );

  if (!isAuthenticated) {
    return <Navigate to="/welcome" />;
  }

  return children;
}

export default PrivateRoute;
