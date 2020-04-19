import React  from 'react';

var Modal = (props) => {
    return(
        <div className="modal-background" style={{display: props.isVisible ? "block" : "none"}}>
            <div className="modal">
                <div className="modal-header">
                    {props.header}                        
                </div>
                <div className="modal-content">
                    {props.body}
                </div>
                <div className="modal-footer" style={{display: props.footer ? "block" : "none"}}>
                    {props.footer}
                </div>
            </div>
        </div>
    )
}

export default Modal;