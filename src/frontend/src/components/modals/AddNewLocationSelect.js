import React from 'react'
import { useModalState, ModalStateAction, ModalTypes } from '../../State/ModalStateProvider'
import Button from '@material-ui/core/Button';

const DefaultCoordinates = {
    lat: 0,
    lon: 0
}

var AddNewLocationSelect = () => {
    const [{}, dispatchModal] = useModalState();
    
    return (
        <div className="add-new-location">
            <Button variant="contained" onClick={()=>dispatchModal(
                {
                    type: ModalStateAction.show, 
                    modalType: ModalTypes.search
                })}
            >Search location</Button>
            <Button variant="contained" onClick={()=>dispatchModal(
                {
                    type: ModalStateAction.show, 
                    data: 
                        {
                            coordinates: DefaultCoordinates
                        }, 
                    modalType: ModalTypes.addLocation
                })}
            >Add location manually</Button>
        </div>
    )
}

export default AddNewLocationSelect;