import React, { useEffect } from 'react';
import useUserService from '../Services/UserService';

const CallbackPage = () => {
  const userService = useUserService();

  useEffect(() => {
    userService.finishAuthentication();
  }, []);

  return (
    <></>
  );
};

export default CallbackPage;
