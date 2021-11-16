import React from 'react';
import Button from '@mui/material/Button';

type Props = {
    onSubmit: () => void;
    onCancel: () => void;
}

const Confirmation = (props: Props) => {
  const { onSubmit, onCancel } = props;

  return (
    <div className="confirmation-container">
      <Button
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Yes
      </Button>
      <Button
        variant="contained"
        onClick={onCancel}
      >
        No
      </Button>
    </div>
  );
};

export default Confirmation;
