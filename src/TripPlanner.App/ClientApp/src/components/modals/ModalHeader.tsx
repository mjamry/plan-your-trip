import React from 'react';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSetRecoilState } from 'recoil';
import { hideModalState } from '../../State/ModalState';

type Props = {
    title: string;
}

function ModalHeader({ title }: Props) {
  const hideModal = useSetRecoilState(hideModalState);

  return (
    <div className="modal-header-container">
      <div className="modal-header-title">{title}</div>
      <IconButton
        onClick={() => hideModal({})}
        title="close"
        size="small"
      >
        <CancelIcon />
      </IconButton>
    </div>
  );
}

export default ModalHeader;
