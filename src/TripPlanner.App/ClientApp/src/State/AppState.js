import React, {createContext, useContext, useReducer} from 'react'

const AppStateActions = {
    setUserSignedIn: 'setuser',
    setAppInitialized: 'setAppInitialized',
    setAppSettings: 'setappsettings'
}

const AppState = {
    userSignedIn: false,
    appInitialized: false,
    appSettings: {}
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
        case AppStateActions.setUserSignedIn:
            state = {...state, userSignedIn: true}
            break;
        case AppStateActions.setAppInitialized:
            state = {...state, appInitialized: true}
            break;
        case AppStateActions.setAppSettings:
            state = {...state, appSettings: action.data}
            break;
        default:
            break;
    }

    return state;
}

export default AppStateProvider;
export {AppContext, AppStateProvider, AppStateActions, useAppState}