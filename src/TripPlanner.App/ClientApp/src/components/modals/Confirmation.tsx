import React from 'react';
import Button from '@mui/material/Button';

type Props = {
    onSubmit: () => void;
    onCancel: () => void;
}

function Confirmation(props: Props) {
  const { onSubmit, onCancel } = props;

  return (
    <div className="confirmation-container">
      <Button
        variant="outlined"
        onClick={onCancel}
      >
        No
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Yes
      </Button>
    </div>
  );
}

export default Confirmation;
