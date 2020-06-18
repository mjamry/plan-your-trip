import React, {useEffect, useState} from 'react'
import { Log, User, UserManager } from 'oidc-client'
import useLoggerService from './Diagnostics/LoggerService'
import {useAppState, AppStateActions} from '../State/AppState'

const config = {
    authority: "http://localhost:50000",
    client_id: "js",
    redirect_uri: "http://localhost:3000/callback",
    response_type: "id_token token",
    scope:"openid profile email trip_planner",
    post_logout_redirect_uri : "http://localhost:3000/",
}

const GET_USER_TIMEOUT = 5000;

const useUserService = () => {
    const [userManager, setUserManager] = useState(new UserManager(config));
    const log = useLoggerService('UserService');
    const [appState, dispatchAppState] = useAppState();

    useEffect(()=>{
        //TODO debug only
        Log.logger = console;
    }, [])

    var signIn = () => {
        userManager.signinRedirect();
    }

    var signOut = () => {
        userManager.signoutRedirect();
    }

    var signInRedirectCallback = () => {
        return userManager.signinRedirectCallback();
    }

    var getUser = () => {
        return new Promise((resolve, reject) => 
        {
            log.debug("Getting user...");
            const getUserTimeout = setTimeout(signIn, GET_USER_TIMEOUT);
            userManager.getUser()
                .then((user) => 
                {
                    clearTimeout(getUserTimeout);
                    if(user){
                        if(user.expired){
                            log.debug("Token expired")
                            signIn();
                        }
        
                        log.debug("User signed in")
                        dispatchAppState({type: AppStateActions.setUserSignedIn});
                    }
                    else
                    {
                        log.debug("No user")
                    }

                    resolve(user);
                })
                .catch(()=>
                {
                    log.error("Error while obtaining user data")
                    reject();
                });
        })
    }

    var getToken = () => {
        return new Promise((resolve, reject) => 
        {
            log.debug("Getting token...")
            getUser()
            .then((user)=>
            {
                if(user.access_token)
                {
                    log.debug("Token obtained")
                    resolve(user.access_token);
                }else
                {
                    log.debug("Silent signin")
                    userManager.signinSilent();
                }
            })
            .catch(()=>
            {
                log.debug("Error while obtaining user token")
                reject();
            })
        })
    } 

    return {
        signIn: signIn,
        signOut: signOut,
        getUser: getUser,
        getToken: getToken,
        signInRedirectCallback: signInRedirectCallback
    }
}

export default useUserService;