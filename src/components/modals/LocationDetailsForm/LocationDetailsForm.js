import React, {useEffect} from 'react';
import LocationAttractivnessButton from '../../Locations/LocationAttractivnessButton'
import { useLocationFormState, LastStep, LocationFormStateActions, LocationFormStateProvider } from './LocationDetailsFormState'
import ModalHeader from '../ModalHeader'
import LocationFormMapView from '../../MapView/LocationFormMapView'

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
}

const LocationDetailsFormBody = (props) => {
    const [formState, dispatchFormState] = useLocationFormState();

    //setup state values
    useEffect(()=>{
        dispatchFormState({type: LocationFormStateActions.updateLocation, data: props.location});
        dispatchFormState({type: LocationFormStateActions.updateCoordinates, data: props.location.coordinates});
    }, [])

    var handleInputChanged = (e) => {
        dispatchFormState({type: LocationFormStateActions.updateLocation, data: {...formState.location, [e.target.name]: e.target.value }})
    }

    var handleAttractivnessChanged = (value) => {
        dispatchFormState({type: LocationFormStateActions.updateLocation, data: {...formState.location, attractivness: value}})
    }

    var handleCoordinatesChanged = (e) => {
        dispatchFormState({type: LocationFormStateActions.updateCoordinates, data: {...formState.location.coordinates, [e.target.name]: e.target.value }})
    }

    var handleMapCoordinatesChanged = (coordinates) => {
        dispatchFormState({type: LocationFormStateActions.updateCoordinates, data: {
                                                                                ...formState.location.coordinates, 
                                                                                lat: coordinates.lat, 
                                                                                lon: coordinates.lng }})
    }

    var renderStep = (step) => {
        switch(step){
            case 1:
                return (
                    <form>
                        <div >
                            <div className="location-edit-form-item">
                                <label htmlFor="location-name" className="col-form-label">Name</label>
                                <input 
                                    name="name" 
                                    className="form-control" 
                                    id="location-name" 
                                    onChange={handleInputChanged}
                                    value={formState.location.name}/>
                            </div>
                            
                            <div className="location-edit-form-item">
                                Atractivness:
                                <LocationAttractivnessButton 
                                        value={formState.location.attractivness} 
                                        onSelect={(value)=>{handleAttractivnessChanged(value)}} 
                                        isActive={true}/>
                            </div>
                            <div className="location-edit-form-item">
                                <label htmlFor="location-description">Description</label>
                                <textarea 
                                    name="description" 
                                    className="form-control" 
                                    rows="5" id="location-description" 
                                    onChange={handleInputChanged}
                                    value={formState.location.description}></textarea>
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
                                    value={formState.coordinates.lat}/>
                            </div>
                            
                            <div className="location-edit-form-item">
                                <label htmlFor="location-coordinates-lon" className="col-form-label">Gps longitude</label>
                                <input 
                                    name="lon" 
                                    className="form-control" 
                                    id="location-coordinates-lon" 
                                    onChange={handleCoordinatesChanged}
                                    value={formState.coordinates.lon}/>
                            </div>

                        </div>

                        <div className="location-edit-form-row">
                                <LocationFormMapView location={formState.location} onCoordinatesUpdated={handleMapCoordinatesChanged}/>
                            </div>
                    </form>
                );

            default: return "";
        }
    }

    return(
        <div className="location-edit-form-container">
            {renderStep(formState.step)}
        </div>
    )
}