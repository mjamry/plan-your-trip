import React from 'react';
import useUserService from './../Services/UserService'

const WelcomePage = () => {
    const userService = useUserService();

    return(<>
        <div className="welcome-page-background"></div>
        <div className="welcome-page-container">
            <div className="welcome-page-content">
                <span className="welcome-page-title">Welcome to the Trip Planner App!</span>
                <span className="welcome-page-text">
                    It is a simple tool that helps you to manage your trips as well as share the best places with your friends.
                    <br/>
                    If you want to use this app you have to create an account.
                    <br/>
                    If you want to just see how it works, please sign in using "demo" account with password "demo".
                    <br/>
                    Enjoy!
                </span>
                <span className="welcome-page-buttons">
                    <button className="btn btn-primary" onClick={()=>userService.signIn()}>Sign In</button>
                </span>
            </div>
        </div>
    </>)
}

export default WelcomePage;