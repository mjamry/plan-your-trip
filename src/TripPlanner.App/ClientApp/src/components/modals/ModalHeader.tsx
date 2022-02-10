import React from 'react';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { useModalState, ModalStateAction } from '../../State/ModalState';

type Props = {
    title: string;
}

function ModalHeader({ title }: Props) {
  const { dispatch } = useModalState();

  return (
    <div className="modal-header-container">
      <div className="modal-header-title">{title}</div>
      <IconButton
        onClick={() => { dispatch({ type: ModalStateAction.hide }); }}
        title="close"
        size="small"
      >
        <CancelIcon />
      </IconButton>
    </div>
  );
}

export default ModalHeader;
