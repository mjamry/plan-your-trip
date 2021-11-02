import React from 'react';
import LocationDto from '../../../../Common/Dto/LocationDto';
import { useLocationFormState, LocationFormStateActions } from '../LocationDetailsFormState';
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
  const { state, dispatch: dispatchFormState } = useLocationFormState();

  const firstStepIndex = 0;
  const lastStepIndex = steps.length - 1;

  const setStep = (stepIndex: number) => {
    dispatchFormState({
      type: LocationFormStateActions.setStep,
      data: stepIndex,
    });
  };

  const next = () => {
    const nextStepIndex = state.step + 1 === lastStepIndex ? lastStepIndex : state.step + 1;
    setStep(nextStepIndex);
  };

  const previous = () => {
    const previousStepIndex = state.step - 1 === firstStepIndex ? firstStepIndex : state.step - 1;
    setStep(previousStepIndex);
  };

  const getCurrentView = () => steps[state.step].view;

  const canNext = (location: LocationDto) => {
    const stepValidator = steps[state.step].validator;
    if (stepValidator) {
      return stepValidator.validate(location);
    }

    return true;
  };

  const isLastStep = () => state.step === lastStepIndex;

  const isFirstStep = () => state.step === firstStepIndex;

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
