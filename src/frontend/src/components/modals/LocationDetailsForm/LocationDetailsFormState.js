import React, {createContext, useContext, useReducer} from 'react';

export const LocationFormStateActions = {
    setStep: "setStep",
    updateLocation: "updateLocation",
    setError: "setError",
    clearError: "clearError"
}

const LocationFormContext = createContext();

export const LocationFormStateProvider = ({children}) => {
    return (
        <LocationFormContext.Provider value={useReducer(_reducer, LocationFormState)}>
            {children}
        </LocationFormContext.Provider>
    )
}

export const useLocationFormState = () => useContext(LocationFormContext);

const LocationFormState = {
    step: 0,
    location: {},
    errors: {}
}

var _reducer = (state, action) => {
    switch(action.type){
        case LocationFormStateActions.setError:
            return {...state, errors: {...state.errors, [action.data.name]:action.data.value}}
        case LocationFormStateActions.clearError:
            return {...state, errors: {...state.errors, [action.data.name]:null}}
        case LocationFormStateActions.updateLocation:
            return {...state, location: action.data};
        case LocationFormStateActions.setStep:
            return {...state, step: action.data};
        default:
            return state;
    }
}