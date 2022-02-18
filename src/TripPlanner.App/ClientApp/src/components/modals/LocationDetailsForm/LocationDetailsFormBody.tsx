import Stepper from '@mui/material/Stepper';
import StepComponent from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useStepsCoordinator from './Steps/StepsCoordinator';
import { Step } from './Steps/Step';
import StepsConfiguration from './Steps/StepsConfig';
import LocationDto from '../../../Common/Dto/LocationDto';
import { locationFormDataState, locationFormStepState } from './LocationDetailsFormState';

type BodyProps = {
    location: LocationDto;
  }

function LocationDetailsFormBody(props: BodyProps) {
  const { location } = props;
  const steps: Step[] = StepsConfiguration;
  const [formStep, setFormStep] = useRecoilState(locationFormStepState);
  const updateLocationData = useSetRecoilState(locationFormDataState);
  const coordinator = useStepsCoordinator(steps);

  useEffect(() => {
    updateLocationData(location);
  }, []);

  const renderStepView = (View: React.ComponentType) => <View />;
  const renderStep = () => renderStepView(coordinator.getCurrentView());

  const renderStepper = () => (
    <Stepper activeStep={formStep} nonLinear alternativeLabel>
      {steps.map((step, index) => (
        <StepComponent key={step.title}>
          <StepButton onClick={() => setFormStep(index)}>{step.title}</StepButton>
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
}

export default LocationDetailsFormBody;
