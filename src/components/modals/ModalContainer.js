import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { useModalState, ModalTypes, ModalStateAction } from '../../State/ModalStateProvider'
import { useLocationsState, LocationsStateActions } from '../../State/LocationsState'
import { LocationDetailsFormBody, LocationDetailsFormHeader } from '../Locations/LocationDetailsForm'
import Search from '../Search/Search'

const _emptyModalContent = {header: "", body: "", footer: ""};

var useModalContentFactory = () => {
    const [modalModel, dispatchModal] = useModalState();
    const [{}, dispatchLocations] = useLocationsState();

    var create = (modalType) => {
        switch(modalType){
            case ModalTypes.addLocation:
                return {
                    header: <LocationDetailsFormHeader title="Add new location"/>,
                    body: <LocationDetailsFormBody 
                        location={modalModel.data}
                        onSubmit={(data)=>{
                            dispatchLocations({
                                type: LocationsStateActions.addLocation, 
                                data: data})
                            dispatchModal({
                                type: ModalStateAction.hide})}}
                        onCancel={()=>{dispatchModal({
                            type: ModalStateAction.hide})}}/>,
                    footer: ""
                }
                
            case ModalTypes.editLocation:
                    return {
                        header: <LocationDetailsFormHeader title="Edit location"/>,
                        body: <LocationDetailsFormBody 
                            location={modalModel.data}
                            onSubmit={(data)=>{
                                dispatchLocations({
                                    type: LocationsStateActions.editLocation, 
                                    data: data})
                                dispatchModal({
                                    type: ModalStateAction.hide})}}
                            onCancel={()=>{dispatchModal({
                                type: ModalStateAction.hide})}}/>,
                        footer: ""
                    }
                    
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

    useEffect(()=>{
        setModalContent(factory(modalModel.type));
    }, [modalModel])

    return <Modal 
                isVisible={modalModel.isVisible} 
                header={modalContent.header}
                body={modalContent.body}
                footer={modalContent.footer}/>
}

export default ModalContainer
