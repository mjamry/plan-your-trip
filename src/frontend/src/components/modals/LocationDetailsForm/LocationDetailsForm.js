import React, {useEffect} from 'react';
import { useLocationFormState, LocationFormStateActions, LocationFormStateProvider } from './LocationDetailsFormState'
import ModalHeader from '../ModalHeader'
import StepsCoordinator, {FirstStep, LastStep} from './Steps/StepsCoordinator'
import Button from '@material-ui/core/Button'

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

const LocationDetailsFooter = ({onSubmit}) => {
    const [formState] = useLocationFormState();
    const coordinator = StepsCoordinator();

    var renderPrevious = () => {
        if(formState.step > FirstStep){
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
        if(formState.step < LastStep){
            return (
                <Button
                    size="small"
                    variant="contained" 
                    onClick={() => coordinator.next()}
                    disabled={!coordinator.canNext()}
                >Next</Button>
            )
        }
    }

    var renderSubmit = () => {
        if(formState.step === LastStep){
            return (
                <Button 
                    size="small"
                    variant="contained" color="primary"
                    onClick={() => onSubmit(formState.location)}
                    disabled={!coordinator.canNext()}
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

    //setup state values
    useEffect(()=>{
        dispatchFormState({type: LocationFormStateActions.updateLocation, data: props.location});
    }, [])

    var renderStep = () => {
        return renderStepView(StepsCoordinator().getCurrentView());
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
