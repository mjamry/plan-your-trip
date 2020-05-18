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

const manager = new UserManager(config);
Log.logger = console;

const useUserSession = () => {
    const {user, setUser} = useState();
    
    useEffect(() => {
        
    }, [])

    var isSignedIn = () => {

    }

    return {
        isSignedIn: isSignedIn,
        userManager: manager
    }
}

export default useUserSession;