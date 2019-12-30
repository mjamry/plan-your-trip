import React from 'react'
import { useModalState, ModalStateAction, ModalTypes } from '../../State/ModalStateProvider'

const DefaultCoordinates = {
    lat: 0,
    lon: 0
}

var AddNewLocationSelect = () => {
    const [{}, dispatchModal] = useModalState();
    
    return (
        <div className="add-new-location">
            <button type="button" onClick={()=>dispatchModal(
                {
                    type: ModalStateAction.show, 
                    modalType: ModalTypes.search
                })} className="btn">Search location</button>
            <button type="button" onClick={()=>dispatchModal(
                {
                    type: ModalStateAction.show, 
                    data: 
                        {
                            coordinates: DefaultCoordinates
                        }, 
                    modalType: ModalTypes.addLocation})} className="btn">Add location manually</button>
        </div>
    )
}

export default AddNewLocationSelect;