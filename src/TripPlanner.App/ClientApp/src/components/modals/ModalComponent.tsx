import React from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

type Props = {
    isVisible: boolean;
    onClickAway: () => void;
    header: JSX.Element;
    body: JSX.Element;
    footer: JSX.Element | undefined;
}

const ModalWrapper = (props: Props) => {
  const {
    isVisible, header, body, footer, onClickAway,
  } = props;

  return (
    <>
      <Modal onClose={onClickAway} open={isVisible}>
        <Box className="modal">
          <div className="modal-header">{header}</div>
          <div className="modal-content">{body}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </Box>
      </Modal>
    </>
  );
};

export default ModalWrapper;
