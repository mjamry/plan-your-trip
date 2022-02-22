import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserService from '../Services/UserService';

/* eslint-disable react/jsx-props-no-spreading */

type Props = {
  children: JSX.Element,
}

function PrivateRoute(props: Props) {
  const { children } = props;
  const userService = useUserService();

  if (!userService.isAuthenticated()) {
    return <Navigate to="/welcome" />;
  }

  return children;
}

export default PrivateRoute;
