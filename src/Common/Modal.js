import React  from 'react';

var Modal = (props) => {
    return(
        <div className="modal-container" style={{display: props.show ? "block" : "none"}}>
            <div className="modal">
                <div className="modal-header">
                    {props.header}                        
                </div>
                <div className="modal-content">
                    {props.content}
                </div>
                <div className="modal-footer">
                    {props.footer}
                </div>
            </div>
        </div>
    )
}

export default Modal;