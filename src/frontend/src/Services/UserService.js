import React, {useEffect, useState} from 'react'
import { Log, User, UserManager } from 'oidc-client'

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

    var isSignedIn = async () => {
        const user = await userManager.getUser();
        return !!user;
    }

    return {
        signIn: signIn,
        signOut: signOut,
        isSignedIn: isSignedIn
    }
}

export default useUserService;