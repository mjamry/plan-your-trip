import React, {createContext, useContext, useReducer} from 'react'

const UserActions = {
    setUser: 'setuser',
    removeUser: 'removeuser'
}

const UserState = {
    signedIn: false,
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
            state = {...state, signedIn: true}
            break;
        case UserActions.removeUser: 
            state = {...state, signedIn: false};
            break;
    }

    return state;
}

export default UserStateProvider;
export {UserContext, UserStateProvider, UserActions, useUserState}