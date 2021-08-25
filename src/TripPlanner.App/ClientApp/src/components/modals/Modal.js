import React  from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

var Modal = (props) => {
    return(<>
        {props.isVisible && <div className="modal-background">
            <ClickAwayListener onClickAway={props.onClickAway}>
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
            </ClickAwayListener>
        </div>}
    </>)
}

export default Modal;