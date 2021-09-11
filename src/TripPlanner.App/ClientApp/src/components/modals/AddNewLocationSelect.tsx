import React from 'react';
import Button from '@material-ui/core/Button';
import { useModalState, ModalStateAction, ModalTypes } from '../../State/ModalState';
import { Coordinate } from '../../Common/Dto/Coordinate';

const DefaultCoordinates: Coordinate = {
  lat: 0,
  lon: 0,
};

const AddNewLocationSelect = () => {
  const { dispatch: dispatchModal } = useModalState();

  return (
    <div className="add-new-location">
      <Button
        variant="contained"
        onClick={() => dispatchModal({
          type: ModalStateAction.show,
          modalType: ModalTypes.search,
          data: undefined,
        })}
      >
        Search location
      </Button>
      <Button
        variant="contained"
        onClick={() => dispatchModal({
          type: ModalStateAction.show,
          data: { coordinates: DefaultCoordinates },
          modalType: ModalTypes.addLocation,
        })}
      >
        Add location manually
      </Button>
    </div>
  );
};

export default AddNewLocationSelect;
