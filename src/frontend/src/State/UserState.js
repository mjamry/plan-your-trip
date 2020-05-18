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

const UserActions = {
    setUser: 'setuser',
    removeUser: 'removeuser'
}

const UserState = {
    user: null,
    userManager: manager,
    signedIn: false,
    token: null
}

const UserContext = createContext();

const UserStateProvider = ({children}) => {
    return (
        <UserContext.Provider value={useReducer(_reducer, UserState)}>
            {children}
        </UserContext.Provider>
    )
}

var useUserState = () => useContext(UserContext);

const _reducer = (state, action) => {
    switch(action.type){
        case UserActions.setUser:
            state = {...state, user: action.data, signedIn: true, token: action.data.access_token}
            break;
        case UserActions.removeUser: 
            state = {...state, user: null, signedIn: false, token: null};
            break;
    }

    return state;
}

export default UserStateProvider;
export {UserContext, UserStateProvider, UserActions, useUserState}