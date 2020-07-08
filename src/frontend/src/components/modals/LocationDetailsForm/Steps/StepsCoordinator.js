import { useLocationFormState, LocationFormStateActions } from '../LocationDetailsFormState'

const useStepsCoordinator = (steps) => {
    const [{step}, dispatchFormState] = useLocationFormState();

    const firstStepIndex = 0;
    const lastStepIndex = steps.length - 1;

    const next = () => {
        var nextStep = step + 1 === lastStepIndex ? lastStepIndex : step + 1;
        setStep(nextStep);
    }

    const previous = () => {
        var previousStep = step - 1 === firstStepIndex ? firstStepIndex : step - 1;
        setStep(previousStep);
    }

    const getCurrentView = () => {
        return steps[step].view
    }

    const canNext = (state) => {
        const stepValidator = steps[step].validator;
        if(stepValidator) {
            return stepValidator.isValid(state);
        }
        else {
            return true;
        }
    }

    const isLastStep = () => {
        return step === lastStepIndex;
    }

    const isFirstStep = () => {
        return step === firstStepIndex;
    }

    var setStep = (step) => {
        dispatchFormState({type: LocationFormStateActions.setStep, data: step});
    }

    return {
        next: next, 
        canNext: canNext,
        previous: previous,
        isLastStep: isLastStep,
        isFirstStep: isFirstStep,
        getCurrentView: getCurrentView
    }
}

export default useStepsCoordinator;