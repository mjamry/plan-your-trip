import React, {createContext, useContext, useReducer} from 'react'


const SessionActions = {
    setUser: 'setUser'
    
}

const SessionState = {
    locations: [],
    selectedList: 2
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
}

export default SessionStateProvider;
export {SessiontateContext, SessionStateProvider, SessionActions, useSessionState}