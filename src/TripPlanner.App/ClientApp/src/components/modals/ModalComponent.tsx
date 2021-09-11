import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

type Props = {
    isVisible: boolean;
    onClickAway: () => void;
    header: JSX.Element;
    body: JSX.Element;
    footer: JSX.Element | undefined;
}

const Modal = (props: Props) => {
  const {
    isVisible, header, body, footer, onClickAway,
  } = props;

  return (
    <>
      { isVisible && (
      <div className="modal-background">
        <ClickAwayListener onClickAway={onClickAway}>
          <div className="modal">
            <div className="modal-header">{header}</div>
            <div className="modal-content">{body}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </ClickAwayListener>
      </div>
      )}
    </>
  );
};

export default Modal;
