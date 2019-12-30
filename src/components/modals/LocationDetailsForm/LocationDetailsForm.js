import React, {useEffect} from 'react';
import { useLocationFormState, LocationFormStateActions, LocationFormStateProvider } from './LocationDetailsFormState'
import ModalHeader from '../ModalHeader'
import StepsCoordinator, {FirstStep, LastStep} from './Steps/StepsCoordinator'

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
    const [formState, dispatchFormState] = useLocationFormState();
    const coordinator = StepsCoordinator();

    var renderPrevious = () => {
        if(formState.step > FirstStep){
            return (
                <button 
                    type="button" 
                    className="btn"     
                    onClick={() => coordinator.previous()}>
                Previous
                </button>
            )
        }
    }

    var renderNext = () => {
        if(formState.step < LastStep){
            return (
                <button 
                    type="button" 
                    className="btn" 
                    onClick={() => coordinator.next()}
                    disabled={!coordinator.canNext()}>
                Next</button>
            )
        }
    }

    var renderSubmit = () => {
        if(formState.step === LastStep){
            return (
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={() => 
                        onSubmit(formState.location)}
                    disabled={!coordinator.canNext()}>
                Save</button>
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
    const [formState, dispatchFormState] = useLocationFormState();

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
