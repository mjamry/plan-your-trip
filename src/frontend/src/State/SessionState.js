import React, {createContext, useContext, useReducer} from 'react'
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

const SessionActions = {
    signIn: 'signin',
    signOut: 'signOut',
    setUser: 'setuser',
    removeUser: 'removeuser'
}

const SessionState = {
    user: null,
    userManager: manager,
    signedIn: false,
    token: null
}

const SessiontateContext = createContext();

const SessionStateProvider = ({children}) => {
    return (
        <SessiontateContext.Provider value={useReducer(_reducer, SessionState)}>
            {children}
        </SessiontateContext.Provider>
    )
}

var useSessionState = () => useContext(SessiontateContext);

const _reducer = (state, action) => {
    switch(action.type){
        case SessionActions.signIn:
            manager.signinRedirect();
            break;
        case SessionActions.signOut:
            manager.signoutRedirect();
            break;
        case SessionActions.setUser:
            state = {...state, user: action.data, signedIn: true, token: action.data.access_token}
            break;
        case SessionActions.removeUser: 
            state = {...state, user: null, signedIn: false, token: null};
            break;
    }

    return state;
}

export default SessionStateProvider;
export {SessiontateContext, SessionStateProvider, SessionActions, useSessionState}