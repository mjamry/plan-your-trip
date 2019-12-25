import React from 'react';
import LocationAttractivnessButton from '../../Locations/LocationAttractivnessButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocationFormState, LastStep, LocationFormStateActions, LocationFormStateProvider } from './LocationDetailsFormState'
import { LocationsStateActions } from '../../../State/LocationsState';

// var useLocationFormContainer = (props) => {
//     // const [location, setLocation] = useState(props.location);
//     // const [coordinates, setCoordinates] = useState(props.location.coordinates);
//      const [step, setStep] = useState(1);

//     // var handleInputChanged = (e) => {
//     //     setLocation({...location, [e.target.name]: e.target.value });
//     // }

//     // var handleCoordinatesChanged = (e) => {
//     //     setCoordinates({...coordinates, [e.target.name]: e.target.value});
//     // }

//     // var handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     props.onSubmit({...location, coordinates: coordinates});
//     // }

//     var handleNext = (e) => {
//         console.log(e);
//     }

//     return {
//         handleNext
//     }
// }

export const useLocationFormBuilder = () => {
    
    var build = ({title, location, onSubmit, onCancel}) => {
        return {
            header: <LocationDetailsFormHeader title={title} onCancel={onCancel}/>,
            body: 
                    <LocationDetailsFormBody location={location}></LocationDetailsFormBody>,
            footer: 
                    <LocationDetailsFooter onSubmit={onSubmit}></LocationDetailsFooter>,
            state: LocationFormStateProvider
        }
    }

    return build;
}

export const LocationDetailsFormHeader = (props) => {

    return(
        <div className="modal-header-container">
            <div>{props.title}</div>
            <div onClick={props.onCancel} className="modal-header-close-button">
                <FontAwesomeIcon icon='window-close' title='close'/>
            </div>
        </div>
    )
}

const LocationDetailsFooter = ({onSubmit}) => {
    const [formState, dispatchFormState] = useLocationFormState();

    var renderPrevious = () => {
        if(formState.step > 1){
            return (
                <button 
                    type="button" 
                    className="btn"     
                    onClick={() => 
                        dispatchFormState({type: LocationFormStateActions.previousStep})}>
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
                    onClick={() => 
                        dispatchFormState({type: LocationFormStateActions.nextStep})}>
                Next
                </button>
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
                        onSubmit({...formState.location, coordinates: formState.coordinates})}>Save</button>
            )
        }
    }

    return(
        <div className="location-edit-form-buttons">
            {renderPrevious()}{renderNext()}{renderSubmit()}
        </div>
    )
    return <div></div>    
}

export const LocationDetailsFormBody = (props) => {
    const [formState, dispatchFormState] = useLocationFormState();

    const handleInputChanged = (e) => {
        //setLocation({...location, [e.target.name]: e.target.value });
        dispatchFormState({type: LocationsStateActions.updateLocation, data: {...formState.location, [e.target.name]: e.target.value }})
    }

    const handleCoordinatesChanged = (e) => {
       // setCoordinates({...coordinates, [e.target.name]: e.target.value});
    }

    var renderStep = (step) => {
        switch(step){
            case 1:
                return (
                    <form>
                        <div className="location-edit-form-container">
                            <div className="location-edit-form-item">
                                <label htmlFor="location-name" className="col-form-label">Name</label>
                                <input 
                                    name="name" 
                                    className="form-control" 
                                    id="location-name" 
                                    onChange={handleInputChanged}
                                    value={props.location.name}/>
                            </div>
                            
                            <div className="location-edit-form-item">
                                Atractivness:
                                <LocationAttractivnessButton 
                                        value={props.location.attractivness} 
                                        onSelect={(value)=>{}} />
                            </div>
                            <div className="location-edit-form-item">
                                <label htmlFor="location-description">Description</label>
                                <textarea 
                                    name="description" 
                                    className="form-control" 
                                    rows="5" id="location-description" 
                                    onChange={handleInputChanged}
                                    value={props.location.description}></textarea>
                            </div>
                            
                        </div>
                    </form>
                );

            case 2: 
                return (
                    <form>
                        <div className="location-edit-form-row">
                            <div className="location-edit-form-item">
                                <label htmlFor="location-coordinates-lat" className="col-form-label">Gps latitude</label>
                                <input 
                                    name="lat" 
                                    className="form-control" 
                                    id="location-coordinates-lat" 
                                    onChange={handleCoordinatesChanged}
                                    value={props.location.coordinates.lat}/>
                            </div>
                            
                            <div className="location-edit-form-item">
                                <label htmlFor="location-coordinates-lon" className="col-form-label">Gps longitude</label>
                                <input 
                                    name="lon" 
                                    className="form-control" 
                                    id="location-coordinates-lon" 
                                    onChange={handleCoordinatesChanged}
                                    value={props.location.coordinates.lon}/>
                            </div>
                        </div>
                    </form>
                );

            default: return "";
        }
    }

    return(
        <div>
            {renderStep(formState.step)}
        </div>
    )
}