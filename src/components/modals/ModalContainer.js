import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { useModalState, ModalTypes, ModalStateAction } from '../../State/ModalStateProvider'
import { useLocationsState, LocationsStatusActions } from '../../State/LocationsState'
import { LocationDetailsFormBody, LocationDetailsFormHeader, LocationDetailsFormModalFooter } from '../Locations/LocationDetailsForm'

const _emptyModalContent = {header: "", body: "", footer: ""};

var _modalContentFactory = (modalType, model, dispatchLocation, dispatchModal) => {
    switch(modalType){
        case ModalTypes.addLocation:
            return {
                header: <LocationDetailsFormHeader title="Add new location"/>,
                body: <LocationDetailsFormBody location={model.data}/>,
                footer: <LocationDetailsFormModalFooter 
                    submit={()=>{
                        dispatchLocation({
                            type: LocationsStatusActions.addLocation, 
                            data: model.data})
                        dispatchModal({
                            type: ModalStateAction.hide})}}
                    cancel={()=>{dispatchModal({
                        type: ModalStateAction.hide})}}/>
            }
        default: 
            console.log(`[ModalFactory] Incorrect modal type: "${modalType}"`);
            return _emptyModalContent;
    }
}

var ModalContainer = () => {
    const [modalContent, setModalContent] = useState(_emptyModalContent);
    const [modalModel, dispatchModal] = useModalState();
    const [locationsModel, dispatchLocations] = useLocationsState();

    useEffect(()=>{
        setModalContent(_modalContentFactory(modalModel.type, modalModel, dispatchLocations, dispatchModal));
    }, [modalModel])

    return <Modal 
                isVisible={modalModel.isVisible} 
                header={modalContent.header}
                body={modalContent.body}
                footer={modalContent.footer}/>
}

export default ModalContainer
