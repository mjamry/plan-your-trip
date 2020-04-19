import {LocationCoordinatesForm, LocationCoordinatesFormValidator, LocationDetailsForm, LocationDetailsFormValidator} from './Steps'

import { useLocationFormState, LocationFormStateActions } from '../LocationDetailsFormState'

export const FirstStep = 0;
export const LastStep = 1;

const steps = [
    {
        view: LocationDetailsForm, 
        validator: LocationDetailsFormValidator()
    }, 
    {
        view: LocationCoordinatesForm, 
        validator: LocationCoordinatesFormValidator()
    }]

const StepsCoordinator = () => {
    const [formState, dispatchFormState] = useLocationFormState();

    var next = () => {
        if(canNext()){
            var nextStep = formState.step + 1 === LastStep ? LastStep : formState.step + 1;
            setStep(nextStep);
        }
    }

    var previous = () => {
        var previousStep = formState.step - 1 === FirstStep ? FirstStep : formState.step - 1;
        setStep(previousStep);
    }

    var getCurrentView = () => {
        return steps[formState.step].view
    }

    var setStep = (step) => {
        dispatchFormState({type: LocationFormStateActions.setStep, data: step});
    }

    var canNext = () => {
        return steps[formState.step].validator.isValid(formState.location);
    }

    return {
        next: next, 
        canNext: canNext,
        previous: previous,
        getCurrentView: getCurrentView
    }
}

export default StepsCoordinator;