
import Stepper from '@material-ui/core/Stepper';
import StepComponent from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import React from "react";
import { useEffect } from "react";
import { LocationFormStateActions, useLocationFormState } from "./LocationDetailsFormState";
import useStepsCoordinator from "./Steps/StepsCoordinator";
import { Step } from './Steps/Step';
import StepsConfiguration from './Steps/StepsConfig';
import { Location } from '../../../Common/Dto/Location';

type BodyProps = {
    location: Location;
  }

const LocationDetailsFormBody = (props: BodyProps) => {
  const steps: Step[] = StepsConfiguration;
  const { state, dispatch } = useLocationFormState();
  const coordinator = useStepsCoordinator(steps);

  useEffect(() => {
    dispatch({
      type: LocationFormStateActions.updateLocation,
      data: props.location,
    });
  }, []);

  const renderStepView = (View: React.ComponentType) => <View />;
  const renderStep = () => renderStepView(coordinator.getCurrentView());

  const selectStep = (stepIndex: number) => {
    dispatch({ type: LocationFormStateActions.setStep, data: stepIndex });
  };

  const renderStepper = () => (
    <Stepper activeStep={state.step} nonLinear alternativeLabel>
      {steps.map((step, index) => (
        <StepComponent key={step.title}>
          <StepButton onClick={() => selectStep(index)}>{step.title}</StepButton>
        </StepComponent>
      ))}
    </Stepper>
  );

  return (
    <div className="location-edit-form-container">
      {renderStepper()}
      {renderStep()}
    </div>
  );
};

export default LocationDetailsFormBody;