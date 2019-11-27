import React, {createContext, useContext, useReducer} from 'react'

export const ModalTypes = {
    addLocation: 'addLocation',
    editLocation: 'editLocation',
    search: 'search',
    confirmation: 'confirmation'
}

export const ModalStateAction = {
    show: 'show',
    hide: 'hide'
}

const ModalState = {
    type: "",
    isVisible: false,
    data: {}
}

var _reducer = (state, action) => {
    switch(action.type){
        case ModalStateAction.show:
            return {...state, data: action.data, type: action.modalType, isVisible: true};
        case ModalStateAction.hide: 
            return {data: null, type: null, isVisible: false};
        default: 
            console.error(`[ModalStatus] Action: "${action.type}" was not defined.`);
            return state;
    }
}

export const ModalContext = createContext(ModalState);

export const ModalStateProvider = ({children}) => {
    return (
        <ModalContext.Provider value={useReducer(_reducer, ModalState)}>
            {children}
        </ModalContext.Provider>
    )
}

export var useModalState = () => useContext(ModalContext);