import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { useModalState, ModalTypes } from '../../State/ModalStateProvider'
import { LocationDetailsFormBody, LocationDetailsFormHeader, LocationDetailsFormModalFooter } from '../Locations/LocationDetailsForm'

const _emptyModalContent = {header: "", body: "", footer: ""};

var _modalContentFactory = (modalType) => {
    switch(modalType){
        case ModalTypes.addLocation:
            return {
                header: <LocationDetailsFormHeader />,
                body: <LocationDetailsFormBody />,
                footer: <LocationDetailsFormModalFooter />
            }
        default: 
            console.log(`[ModalFactory] Incorrect modal type: "${modalType}"`);
            return _emptyModalContent;
    }
}

var ModalContainer = () => {
    const [modalContent, setModalContent] = useState(_emptyModalContent);
    const [modalModel] = useModalState();

    useEffect(()=>{
        setModalContent(_modalContentFactory(modalModel.type));
    }, [modalModel])

    return <Modal 
                isVisible={modalModel.isVisible} 
                header={modalContent.header}
                body={modalContent.body}
                footer={modalContent.footer}/>
}

export default ModalContainer
