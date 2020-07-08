import React, {useEffect} from 'react';
import { useLocationFormState, LocationFormStateActions, LocationFormStateProvider } from './LocationDetailsFormState'
import ModalHeader from '../ModalHeader'
import useStepsCoordinator from './Steps/StepsCoordinator'
import Button from '@material-ui/core/Button'
import {LocationDetailsStep, LocationDetailsStepValidator} from './Steps/LocationDetailsStep'
import {LocationCoordinatesStep, LocationCoordinatesStepValidator} from './Steps/LocationCoordinatesStep'
import {LocationImageStep, LocationImageStepValidator} from './Steps/LocationImageStep'

export const useLocationFormBuilder = () => {
    
    var build = ({title, location, onSubmit, onCancel}) => {
        return {
            header: <ModalHeader title={title} onCancel={onCancel}/>,
            body: 
                    <LocationDetailsFormBody location={location}></LocationDetailsFormBody>,
            footer: 
                    <LocationDetailsFooter onSubmit={onSubmit}></LocationDetailsFooter>,
            state: LocationFormStateProvider
        }
    }

    return build;
}

const steps = [
    {
        title: "Fill location details",
        view: LocationDetailsStep, 
        validator: LocationDetailsStepValidator()
    }, 
    {
        title: "Find GPS coordinates",
        view: LocationCoordinatesStep, 
        validator: LocationCoordinatesStepValidator()
    },
    {
        title: "Setup image URL",
        view: LocationImageStep,
        validator: LocationImageStepValidator()
    }
]

const LocationDetailsFooter = ({onSubmit}) => {
    const [formState] = useLocationFormState();
    const coordinator = useStepsCoordinator(steps);

    var renderPrevious = () => {
        if(!coordinator.isFirstStep()){
            return (
                <Button
                    size="small" 
                    variant="contained"    
                    onClick={() => coordinator.previous()}
                >Previous</Button>
            )
        }
    }

    var renderNext = () => {
        if(!coordinator.isLastStep()){
            return (
                <Button
                    size="small"
                    variant="contained" 
                    onClick={() => coordinator.next()}
                    disabled={!coordinator.canNext(formState.location)}
                >Next</Button>
            )
        }
    }

    var renderSubmit = () => {
        if(coordinator.isLastStep()){
            return (
                <Button 
                    size="small"
                    variant="contained" color="primary"
                    onClick={() => onSubmit(formState.location)}
                    disabled={!coordinator.canNext(formState.location)}
                >Save</Button>
            )
        }
    }

    return(
        <div className="location-edit-form-buttons">
            {renderPrevious()}{renderNext()}{renderSubmit()}
        </div>
    )
}

const LocationDetailsFormBody = (props) => {
   const [{}, dispatchFormState] = useLocationFormState();
   const coordinator = useStepsCoordinator(steps);

    //setup state values
    useEffect(()=>{
        dispatchFormState({type: LocationFormStateActions.updateLocation, data: props.location});
    }, [])

    var renderStep = () => {
        return renderStepView(coordinator.getCurrentView());
    }

    var renderStepView = (View, props) => {
        return <View {...props}/>
    }

    return(
        <div className="location-edit-form-container">
            {renderStep()}
        </div>
    )
}
