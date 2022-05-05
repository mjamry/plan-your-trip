import Button from '@mui/material/Button';
import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import LocationDto from '../../../Common/Dto/LocationDto';
import { Nullable } from '../../../Common/Dto/Nullable';
import {
  locationFormDataState, locationFormErrorState, locationFormImageFile, locationFormStepState,
} from './LocationDetailsFormState';
import { Step } from './Steps/Step';
import StepsConfiguration from './Steps/StepsConfig';
import useStepsCoordinator from './Steps/StepsCoordinator';

type FooterProps = {
  onSubmit: (location: LocationDto, imageFile: Nullable<File>) => void;
}

function LocationDetailsFooter({ onSubmit }: FooterProps): JSX.Element {
  const steps: Step[] = StepsConfiguration;
  const coordinator = useStepsCoordinator(steps);
  const locationData = useRecoilValue(locationFormDataState);
  const resetStep = useResetRecoilState(locationFormStepState);
  const resetError = useResetRecoilState(locationFormErrorState);
  const resetLocationData = useResetRecoilState(locationFormDataState);
  const imageFile = useRecoilValue(locationFormImageFile);

  const handleSubmit = async () => {
    resetStep();
    resetError();
    resetLocationData();
    await onSubmit(locationData, imageFile);
  };

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
          disabled={!coordinator.canNext(locationData)}
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
          onClick={() => handleSubmit()}
          disabled={!coordinator.canNext(locationData)}
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
}

export default LocationDetailsFooter;
