import Button from '@material-ui/core/Button';
import React from "react";
import { useLocationFormState } from "./LocationDetailsFormState";
import { Step } from "./Steps/Step";
import StepsConfiguration from "./Steps/StepsConfig";
import useStepsCoordinator from "./Steps/StepsCoordinator";
import { Location } from '../../../Common/Dto/Location';

type FooterProps = {
  onSubmit: (location: Location) => void;
}

const LocationDetailsFooter = ({ onSubmit }: FooterProps): JSX.Element => {
  const steps: Step[] = StepsConfiguration;
  const { state } = useLocationFormState();
  const coordinator = useStepsCoordinator(steps);

  const renderPrevious = () => {
    if (!coordinator.isFirstStep()) {
      return (
        <Button
          size="small"
          variant="contained"
          onClick={() => coordinator.previous()}
        >
          Previous
        </Button>
      );
    }

    return <></>;
  };

  const renderNext = (): JSX.Element => {
    if (!coordinator.isLastStep()) {
      return (
        <Button
          size="small"
          variant="contained"
          onClick={() => coordinator.next()}
          disabled={!coordinator.canNext(state.location)}
        >
          Next
        </Button>
      );
    }

    return <></>;
  };

  const renderSubmit = (): JSX.Element => {
    if (coordinator.isLastStep()) {
      return (
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => onSubmit(state.location!)}
          disabled={!coordinator.canNext(state.location)}
        >
          Save
        </Button>
      );
    }

    return <></>;
  };

  return (
    <div className="location-edit-form-buttons">
      {renderPrevious()}
      {renderNext()}
      {renderSubmit()}
    </div>
  );
};

export default LocationDetailsFooter;