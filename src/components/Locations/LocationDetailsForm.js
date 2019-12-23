import React, {useState, createContext, useContext, useReducer} from 'react';
import LocationAttractivnessButton from '../Locations/LocationAttractivnessButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LastStep = 2;

const LocationFormState = {
    step: 1,
    location: {},
    coordinates: {}
}

export const LocationFormContext = createContext();

export const LocationFormStateProvider = ({children}) => {
    return (
        <LocationFormContext.Provider value={useReducer(_reducer, LocationFormState)}>
            {children}
        </LocationFormContext.Provider>
    )
}

export var useLocationFormState = () => useContext(LocationFormContext);

var _reducer = (state, action) => {
    switch(action.type){
        case "updateLocation":
            return {...state, locations: action.data};
        case "updateCoordinates":
            return {...state, coordinates: action.data};
        case "nextStep":
            var nextStep = state.step + 1 === LastStep ? LastStep : state.step + 1;
            return {...state, step: nextStep};
        case "previousStep":
            var previousStep = state.step - 1 === 0 ? 0 : state.step - 1;
            return {...state, step: previousStep};
        default:
            return state;
    }
}

var useLocationFormContainer = (props) => {
    // const [location, setLocation] = useState(props.location);
    // const [coordinates, setCoordinates] = useState(props.location.coordinates);
     const [step, setStep] = useState(1);

    // var handleInputChanged = (e) => {
    //     setLocation({...location, [e.target.name]: e.target.value });
    // }

    // var handleCoordinatesChanged = (e) => {
    //     setCoordinates({...coordinates, [e.target.name]: e.target.value});
    // }

    // var handleSubmit = (e) => {
    //     e.preventDefault();
    //     props.onSubmit({...location, coordinates: coordinates});
    // }

    var handleNext = (e) => {
        console.log(e);
    }

    return {
        handleNext
    }
}

export var useLocationFormBuilder = () => {
    
    var build = ({title, location, onSubmit, onCancel}) => {
        return {
            header: <LocationDetailsFormHeader title={title} onCancel={onCancel}/>,
            body: 
            <LocationFormStateProvider>
                <LocationDetailsFormBody location={location} onSubmit={onSubmit}></LocationDetailsFormBody>
            </LocationFormStateProvider>,
            footer: 
            <LocationFormStateProvider>
                <LocationDetailsFooter onSubmit={onSubmit}></LocationDetailsFooter>
            </LocationFormStateProvider> 
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

const LocationDetailsFooter = (onSubmit) => {
    const [formState, dispatchFormState] = useLocationFormState();

    var renderPrevious = () => {
        if(formState.step > 1){
            return (
                <button type="button" className="btn" onClick={()=>dispatchFormState({type: "previousStep"})}>Previous</button>
            )
        }
    }

    var renderNext = () => {
        if(formState.step < LastStep){
            return (
                <button type="button" className="btn" onClick={()=>dispatchFormState({type: "nextStep"})}>Next</button>
            )
        }
    }

    var renderSubmit = () => {
        if(formState.step === LastStep){
            return (
                <button type="button" className="btn btn-primary" onClick={onSubmit}>Save</button>
            )
        }
    }

    return(
        <div>
            {renderPrevious()}{renderNext()}{renderSubmit()}
        </div>
    )
}

export const LocationDetailsFormBody = (props) => {
    const [location, setLocation] = useState(props.location);
    const [coordinates, setCoordinates] = useState(props.location.coordinates);

    const handleInputChanged = (e) => {
        setLocation({...location, [e.target.name]: e.target.value });
    }

    const handleCoordinatesChanged = (e) => {
        setCoordinates({...coordinates, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({...location, coordinates: coordinates});
    }

    return(
    <form onSubmit={handleSubmit}>
        <div className="location-edit-form-container">
            <div className="location-edit-form-item">
                <label htmlFor="location-name" className="col-form-label">Name</label>
                <input 
                    name="name" 
                    className="form-control" 
                    id="location-name" 
                    onChange={handleInputChanged}
                    value={location.name}/>
            </div>
            <div className="location-edit-form-row">
                <div className="location-edit-form-item">
                    <label htmlFor="location-coordinates-lat" className="col-form-label">Gps latitude</label>
                    <input 
                        name="lat" 
                        className="form-control" 
                        id="location-coordinates-lat" 
                        onChange={handleCoordinatesChanged}
                        value={coordinates.lat}/>
                </div>
                
                <div className="location-edit-form-item">
                    <label htmlFor="location-coordinates-lon" className="col-form-label">Gps longitude</label>
                    <input 
                        name="lon" 
                        className="form-control" 
                        id="location-coordinates-lon" 
                        onChange={handleCoordinatesChanged}
                        value={coordinates.lon}/>
                </div>
            </div>
            <div className="location-edit-form-item">
                Atractivness:
                <LocationAttractivnessButton 
                        value={location.attractivness} 
                        onSelect={(value)=>{setLocation({...location, attractivness: value})}} />
            </div>
            <div className="location-edit-form-item">
                <label htmlFor="location-description">Description</label>
                <textarea 
                    name="description" 
                    className="form-control" 
                    rows="5" id="location-description" 
                    onChange={handleInputChanged}
                    value={location.description}></textarea>
            </div>
            <div className="location-edit-form-buttons">
                <button type="submit" className="btn btn-primary" data-dismiss="modal">Save</button>
                <button type="button" className="btn" data-dismiss="modal" onClick={props.onCancel}>Cancel</button>
            </div>
        </div>
    </form>)
}