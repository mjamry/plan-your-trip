import React, {useState} from 'react';

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

    return(<form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="location-name" className="col-form-label">Name</label>
            <input 
                name="name" 
                className="form-control" 
                id="location-name" 
                onChange={handleInputChanged}
                value={location.name}/>
        </div>
        <div className="form-row">
        <div className="form-group col-md-6">
            <label htmlFor="location-coordinates-lat" className="col-form-label">Gps latitude</label>
            <input 
                name="lat" 
                className="form-control" 
                id="location-coordinates-lat" 
                onChange={handleCoordinatesChanged}
                value={coordinates.lat}/>
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="location-coordinates-lon" className="col-form-label">Gps longitude</label>
            <input 
                name="lon" 
                className="form-control" 
                id="location-coordinates-lon" 
                onChange={handleCoordinatesChanged}
                value={coordinates.lon}/>
        </div>
        </div>
        <div className="form-group">
            <label htmlFor="location-description">Description</label>
            <textarea 
                name="description" 
                className="form-control" 
                rows="5" id="location-description" 
                onChange={handleInputChanged}
                value={location.description}></textarea>
        </div>
        <button type="submit" className="btn btn-primary" data-dismiss="modal">Save</button>
        <button type="button" className="btn" data-dismiss="modal" onClick={props.onCancel}>Cancel</button>
    </form>)
}