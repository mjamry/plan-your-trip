import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import ModalHeader from './ModalHeader';
import { ModalDto } from '../../Common/Dto/ModalDto';
import PlanDto from '../../Common/Dto/PlanDto';

type BuilderDto = {
    title: string;
    plan: PlanDto;
    onSubmit: (plan: PlanDto) => void;
    onCancel?: () => void;
}

type PlanDetailsProps = {
  plan: PlanDto;
  onSubmit: (plan: PlanDto) => void;
}

function PlanDetailsFormBody({ plan, onSubmit }: PlanDetailsProps) {
  const [state, setState] = useState<PlanDto>(plan);

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleCheckboxChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  return (
    <div className="plan-form-container">
      <div className="plan-form-item">
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
      <div className="plan-form-item">
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
      <div className="plan-form-item">
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
      <div className="plan-form-item-submit">
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
}

const usePlanFormBuilder = () => {
  const build = (data: BuilderDto): ModalDto => ({
    header: <ModalHeader title={data.title} />,
    body: <PlanDetailsFormBody plan={data.plan} onSubmit={data.onSubmit} />,
  });

  return build;
};

export default usePlanFormBuilder;
