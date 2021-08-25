import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModalState, ModalStateAction } from '../../State/ModalStateProvider'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel';

const ModalHeader = (props) => {
    const [{}, dispatchModal] = useModalState();

    return(
        <div className="modal-header-container">
            <div className="modal-header-title">{props.title}</div>
            <IconButton
                onClick={()=>{dispatchModal({type: ModalStateAction.hide})}}
                title="close"
                size="small"
            >
                <CancelIcon/>
            </IconButton>
        </div>
    )
}

export default ModalHeader;