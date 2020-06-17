import React, {createContext, useContext, useReducer} from 'react'

const UserActions = {
    setUser: 'setuser',
    removeUser: 'removeuser'
}

const UserState = {
    user: null,
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