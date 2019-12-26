import React, {createContext, useContext, useReducer} from 'react';

export const LastStep = 2;

export const LocationFormStateActions = {
    nextStep: "nextStep",
    previousStep: "previousStep",
    updateLocation: "updateLocation",
    updateCoordinates: "updateCoordinates"
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
    step: 1,
    location: {},
    coordinates: {}
}

var _reducer = (state, action) => {
    switch(action.type){
        case LocationFormStateActions.updateLocation:
            return {...state, location: action.data};
        case LocationFormStateActions.updateCoordinates:
            return {...state, coordinates: action.data};
        case LocationFormStateActions.nextStep:
            var nextStep = state.step + 1 === LastStep ? LastStep : state.step + 1;
            return {...state, step: nextStep};
        case LocationFormStateActions.previousStep:
            var previousStep = state.step - 1 === 0 ? 0 : state.step - 1;
            return {...state, step: previousStep};
        default:
            return state;
    }
}