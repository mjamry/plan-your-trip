import React from 'react';
import Button from '@material-ui/core/Button';
import useUserService from '../Services/UserService';

const WelcomePage = () => {
  const userService = useUserService();

  return (
    <>
      <div className="welcome-page-background" />
      <div className="welcome-page-container">
        <div className="welcome-page-content">
          <span className="welcome-page-title">Welcome to the Trip Planner App!</span>
          <span className="welcome-page-text">
            It is a simple tool that helps you to manage your trips
            as well as share the best places with your friends.
            <br />
            If you want to use this app you have to create an account.
            <br />
            If you want to just see how it works,
            please sign in using &quot;demo&quot; account with password &quot;demo&quot;.
            <br />
            Enjoy!
          </span>
          <span className="welcome-page-buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={() => userService.signIn()}
            >
              Sign In
            </Button>
          </span>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
