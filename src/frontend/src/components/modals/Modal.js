import React  from 'react';

var Modal = (props) => {
    return(<>
        {props.isVisible && <div className="modal-background">
            <div className="modal">
                <div className="modal-header">
                    {props.header}                        
                </div>
                <div className="modal-content">
                    {props.body}
                </div>
                {props.footer && <div className="modal-footer">
                    {props.footer}
                </div>}
            </div>
        </div>}
    </>)
}

export default Modal;