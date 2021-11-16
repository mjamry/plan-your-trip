import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import ModalHeader from './ModalHeader';
import { ModalDto } from '../../Common/Dto/ModalDto';
import ListDto from '../../Common/Dto/ListDto';

type BuilderDto = {
    title: string;
    list: ListDto;
    onSubmit: (list: ListDto) => void;
    onCancel?: () => void;
}

type ListDetailsProps = {
  list: ListDto;
  onSubmit: (list: ListDto) => void;
}

const ListDetailsFormBody = ({ list, onSubmit }: ListDetailsProps) => {
  const [state, setState] = useState<ListDto>(list);

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleCheckboxChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  return (
    <div className="list-form-container">
      <div className="list-form-item">
        <TextField
          label="Name"
          required
          variant="outlined"
          size="medium"
          margin="dense"
          name="name"
          onChange={handleInputChanged}
          value={state.name || ''}
          autoFocus
          inputProps={{
            maxLength: '50',
          }}
        />
      </div>
      <div className="list-form-item">
        <TextField
          variant="outlined"
          size="medium"
          margin="dense"
          label="Description"
          name="description"
          onChange={handleInputChanged}
          value={state.description || ''}
          multiline
          maxRows={5}
          inputProps={{
            maxLength: '200',
          }}
        />
      </div>
      <div className="list-form-item">
        <FormControlLabel
          control={(
            <Checkbox
              checked={state.isPrivate}
              onChange={handleCheckboxChanged}
              name="isPrivate"
              color="primary"
              value="false"
            />
                      )}
          label="Is Private"
        />
      </div>
      <div className="list-form-item-submit">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSubmit(state)}
          disabled={!state.name}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

const useListFormBuilder = () => {
  const build = (data: BuilderDto): ModalDto => ({
    header: <ModalHeader title={data.title} />,
    body: <ListDetailsFormBody list={data.list} onSubmit={data.onSubmit} />,
  });

  return build;
};

export default useListFormBuilder;
