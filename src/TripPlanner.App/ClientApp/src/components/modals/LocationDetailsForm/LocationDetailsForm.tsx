import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import StepComponent from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { useLocationFormState, LocationFormStateActions, LocationFormStateProvider } from './LocationDetailsFormState';
import ModalHeader from '../ModalHeader';
import useStepsCoordinator from './Steps/StepsCoordinator';
import { LocationDetailsStep, LocationDetailsStepValidator } from './Steps/LocationDetailsStep';
import { LocationCoordinatesStep, LocationCoordinatesStepValidator } from './Steps/LocationCoordinatesStep';
import { LocationImageStep, LocationImageStepValidator } from './Steps/LocationImageStep';
import { ModalDto } from '../../../Common/Dto/ModalDto';
import { Location } from '../../../Common/Dto/Location';
import { Step } from './Steps/Step';

type BuilderDto = {
  title: string;
  location: Location;
  onSubmit: (location: Location) => void;
  onCancel?: () => void;
}

const useLocationFormBuilder = () => {
  const build = (data: BuilderDto): ModalDto<typeof LocationFormStateProvider> => ({
    header: <ModalHeader title={data.title} />,
    body: <LocationDetailsFormBody location={data.location} />,
    footer: <LocationDetailsFooter onSubmit={data.onSubmit} />,
    state: LocationFormStateProvider,
  });

  return build;
};

const steps: Step[] = [
  {
    title: 'Fill location details',
    view: LocationDetailsStep,
    validator: LocationDetailsStepValidator(),
  },
  {
    title: 'Find GPS coordinates',
    view: LocationCoordinatesStep,
    validator: LocationCoordinatesStepValidator(),
  },
  {
    title: 'Setup image URL',
    view: LocationImageStep,
    validator: LocationImageStepValidator(),
  },
];

type FooterProps = {
  onSubmit: (location: Location) => void;
}

const LocationDetailsFooter = ({ onSubmit }: FooterProps): JSX.Element => {
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

type BodyProps = {
  location: Location;
}

const LocationDetailsFormBody = (props: BodyProps) => {
  const { state, dispatch } = useLocationFormState();
  const coordinator = useStepsCoordinator(steps);

  // setup state values
  useEffect(() => {
    dispatch({
      type: LocationFormStateActions.updateLocation,
      data: props.location,
    });
  }, []);

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

  const renderStepView = (View: React.ComponentType) => <View />;

  return (
    <div className="location-edit-form-container">
      {renderStepper()}
      {renderStep()}
    </div>
  );
};

export default useLocationFormBuilder;
