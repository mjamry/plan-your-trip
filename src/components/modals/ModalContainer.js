import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { useModalState, ModalTypes, ModalStateAction } from '../../State/ModalStateProvider'
import { useLocationFormBuilder } from './LocationDetailsForm/LocationDetailsForm'
import ModalHeader from './ModalHeader'
import Search from '../Search/Search'
import AddNewLocationSelect from './AddNewLocationSelect'
import Confirmation from './Confirmation'
import LoadingIndicator from './LoadingIndicator'
import useLocationService from '../../Services/LocationService'

const _emptyModalContent = {header: "", body: "", footer: "", state: ""};

var useModalContentFactory = () => {
    const [modalModel, dispatchModal] = useModalState();
    const locationService = useLocationService();

    var create = (modalType) => {
        var locationFormBuilder = useLocationFormBuilder();

        switch(modalType){
            case ModalTypes.addLocation:
                return locationFormBuilder(
                    {
                        title: "Add location",
                        location: modalModel.data,
                        onSubmit: ()=>{
                            locationService.add(modalModel.data)
                            dispatchModal({
                                type: ModalStateAction.hide})}
                    }
                )
                
            case ModalTypes.editLocation:
                return locationFormBuilder(
                    {
                        title: "Edit location",
                        location: modalModel.data,
                        onSubmit: (data)=>{
                                locationService.edit(data)
                                dispatchModal({
                                    type: ModalStateAction.hide})
                            }
                    }
                )

            case ModalTypes.removeLocation:
                var submitAction = ()=>{
                    locationService.remove(modalModel.data)
                    dispatchModal({type: ModalStateAction.hide})};

                return {
                    header: <ModalHeader title={`Do you want to remove\n\r "${modalModel.data.name}"`}/>,
                    body: <Confirmation 
                        onSubmit={()=>submitAction(modalModel.data)}
                        onCancel={()=>dispatchModal({type: ModalStateAction.hide})}/>,
                    footer: null
                }
                    
            case ModalTypes.search: 
                return {
                    header: <ModalHeader title="Search location"/>,
                    body: <Search />,
                    footer: null
                }

            case ModalTypes.addNewLocationSelect:
                return {
                    header: <ModalHeader title="Select option"/>,
                    body: <AddNewLocationSelect />,
                    footer: null
                }

            case ModalTypes.loading:
                return {
                    header: <ModalHeader title="Loading..." />,
                    body: <LoadingIndicator />,
                    footer: null
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
