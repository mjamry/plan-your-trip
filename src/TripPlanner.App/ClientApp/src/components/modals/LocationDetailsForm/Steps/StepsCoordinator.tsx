import React from 'react';
import { useRecoilState } from 'recoil';
import LocationDto from '../../../../Common/Dto/LocationDto';
import { locationFormStepState } from '../LocationDetailsFormState';
import { Step } from './Step';

type StepCoordinatorService = {
  next: () => void;
  canNext: (location: LocationDto) => boolean;
  previous: () => void;
  isLastStep: () => boolean;
  isFirstStep: () => boolean,
  getCurrentView: () => React.ComponentType,
}

const useStepsCoordinator = (steps: Step[]): StepCoordinatorService => {
  const [step, setStep] = useRecoilState(locationFormStepState);

  const firstStepIndex = 0;
  const lastStepIndex = steps.length - 1;

  const next = () => {
    const nextStepIndex = step + 1 === lastStepIndex ? lastStepIndex : step + 1;
    setStep(nextStepIndex);
  };

  const previous = () => {
    const previousStepIndex = step - 1 === firstStepIndex ? firstStepIndex : step - 1;
    setStep(previousStepIndex);
  };

  const getCurrentView = () => steps[step].view;

  const canNext = (location: LocationDto) => {
    const stepValidator = steps[step].validator;
    if (stepValidator) {
      return stepValidator.validate(location);
    }

    return true;
  };

  const isLastStep = () => step === lastStepIndex;

  const isFirstStep = () => step === firstStepIndex;

  return {
    next,
    canNext,
    previous,
    isLastStep,
    isFirstStep,
    getCurrentView,
  };
};

export default useStepsCoordinator;
