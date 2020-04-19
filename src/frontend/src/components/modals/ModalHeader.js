import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModalState, ModalStateAction } from '../../State/ModalStateProvider'

const ModalHeader = (props) => {
    const [{}, dispatchModal] = useModalState();

    return(
        <div className="modal-header-container">
            <div>{props.title}</div>
            <div onClick={()=>{dispatchModal({type: ModalStateAction.hide})}} className="modal-header-close-button">
                <FontAwesomeIcon icon='window-close' title='close'/>
            </div>
        </div>
    )
}

export default ModalHeader;