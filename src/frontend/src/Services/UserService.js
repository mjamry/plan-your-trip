import React, {useEffect, useState} from 'react'
import { Log, User, UserManager } from 'oidc-client'
import useLoggerService from './Diagnostics/LoggerService'

const config = {
    authority: "http://localhost:50000",
    client_id: "js",
    redirect_uri: "http://localhost:3000/callback.html",
    response_type: "id_token token",
    scope:"openid profile email trip_planner",
    post_logout_redirect_uri : "http://localhost:3000/index.html",
}

const useUserService = () => {
    const [userManager, setUserManager] = useState(new UserManager(config));
    const log = useLoggerService('UserService');

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

    var getUser = () => {
        return new Promise((resolve, reject) => 
        {
            log.debug("Getting user...");
            userManager.getUser()
                .then((user) => 
                {
                    if(user){
                        if(user.expired){
                            log.debug("Token expired")
                            signIn();
                        }
        
                        log.debug("User signed in")
                        resolve(user);
                    }
                    else
                    {
                        log.debug("No user -> redirect to sign in")
                        signIn();
                    }
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
                log.debug("Token obtained")
                resolve(user.access_token);
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
        getToken: getToken
    }
}

export default useUserService;