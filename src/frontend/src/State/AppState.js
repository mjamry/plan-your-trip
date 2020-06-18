import React, {createContext, useContext, useReducer} from 'react'

const AppStateActions = {
    setUser: 'setuser',
    removeUser: 'removeuser'
}

const AppState = {
    userSignedIn: false,
}

const AppContext = createContext();

const AppStateProvider = ({children}) => {
    return (
        <AppContext.Provider value={useReducer(_reducer, AppState)}>
            {children}
        </AppContext.Provider>
    )
}

var useAppState = () => useContext(AppContext);

const _reducer = (state, action) => {
    switch(action.type){
        case AppStateActions.setUser:
            state = {...state, userSignedIn: true}
            break;
        case AppStateActions.removeUser: 
            state = {...state, userSignedIn: false};
            break;
    }

    return state;
}

export default AppStateProvider;
export {AppContext, AppStateProvider, AppStateActions, useAppState}