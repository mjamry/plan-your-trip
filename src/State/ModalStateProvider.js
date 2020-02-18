import React, {createContext, useContext, useReducer} from 'react'
import useLoggerService from '../Services/Diagnostics/LoggerService'

export const ModalTypes = {
    addLocation: 'addLocation',
    editLocation: 'editLocation',
    search: 'search',
    loading: 'loading',
    removeLocation: 'removeLocation',
    addNewLocationSelect: 'addNewLocationSelect',
    addList: 'addList',
    editList: 'editList',
    removeList: 'removeList'
}

export const ModalStateAction = {
    show: 'show',
    hide: 'hide',
    update: 'update'
}

const ModalState = {
    type: "",
    isVisible: false,
    data: {}
}

var _reducer = (state, action) => {
    var logger = useLoggerService();
    switch(action.type){
        case ModalStateAction.show:
            return {...state, data: action.data, type: action.modalType, isVisible: true};
        case ModalStateAction.hide: 
            return {data: null, type: null, isVisible: false};
        case ModalStateAction.update:
            return {...state, data: action.data};
        default: 
            logger.debug(`[ModalStatus] Action: "${action.type}" was not defined.`);
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