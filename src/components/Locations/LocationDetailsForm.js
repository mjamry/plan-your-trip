import React, {useState} from 'react';
import LocationAttractivnessButton from '../Locations/LocationAttractivnessButton'

export const LocationDetailsFormHeader = (props) => {
    return(
        <div>{props.title}</div>
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