import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { useModalState, ModalTypes, ModalStateAction } from '../../State/ModalStateProvider'
import { useLocationsState, LocationsStateActions } from '../../State/LocationsState'
import { useLocationFormBuilder } from './LocationDetailsForm/LocationDetailsForm'
import Search from '../Search/Search'

const _emptyModalContent = {header: "", body: "", footer: "", state: ""};

var useModalContentFactory = () => {
    const [modalModel, dispatchModal] = useModalState();
    const [{}, dispatchLocations] = useLocationsState();

    var create = (modalType) => {
        var locationFormBuilder = useLocationFormBuilder();

        switch(modalType){
            case ModalTypes.addLocation:
                return locationFormBuilder(
                    {
                        title: "Add new location",
                        location: modalModel.data,
                        onSubmit: (data)=>{
                            dispatchLocations({
                                type: LocationsStateActions.addLocation, 
                                data: data})
                            dispatchModal({
                                type: ModalStateAction.hide})},
                        onCancel: ()=>{dispatchModal({
                            type: ModalStateAction.hide})
                    }
                })
                
            case ModalTypes.editLocation:
                return locationFormBuilder(
                    {
                        title: "Edit location",
                        location: modalModel.data,
                        onSubmit: (data)=>{
                            dispatchLocations({
                                type: LocationsStateActions.editLocation, 
                                data: data})
                            dispatchModal({
                                type: ModalStateAction.hide})
                            console.log("EDIT!")},
                        onCancel: ()=>{dispatchModal({
                            type: ModalStateAction.hide})
                    }
                })
                    
            case ModalTypes.search: 
                    return {
                        header: "Search location by name",
                        body: <Search />,
                        footer: ""
                    }

        default: 
            console.log(`[ModalFactory] Incorrect modal type: "${modalType}"`);
            return _emptyModalContent;
    }}
    
    return create;
}

var ModalContainer = () => {
    const [modalContent, setModalContent] = useState(_emptyModalContent);
    const [modalModel] = useModalState();
    const factory = useModalContentFactory();

    var renderModal = () => {
        var render = (ModalState) => {
            if(ModalState) {
                return  <ModalState>
                            <Modal 
                                isVisible={modalModel.isVisible} 
                                header={modalContent.header}
                                body={modalContent.body}
                                footer={modalContent.footer}/>
                        </ModalState>}
            else {
                return <Modal 
                    isVisible={modalModel.isVisible} 
                    header={modalContent.header}
                    body={modalContent.body}
                    footer={modalContent.footer}/>
            }
        }

        return render(modalContent.state);
    }

    useEffect(()=>{
        setModalContent(factory(modalModel.type));
    }, [modalModel])

    return renderModal();
}

export default ModalContainer
