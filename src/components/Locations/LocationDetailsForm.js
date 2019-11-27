import React from 'react';

export const LocationDetailsFormModalFooter = (props) => {
    return(
        <div>
            <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={props.submit}>Save</button>
            <button type="button" className="btn" data-dismiss="modal" onClick={props.cancel}>Cancel</button>
        </div>
    )
}

export const LocationDetailsFormHeader = (props) => {
    return(
        <div>{props.title}</div>
    )
}

export const LocationDetailsFormBody = (props) => {
    return(<form>
        <div className="form-group">
            <label htmlFor="location-name" className="col-form-label">Name</label>
            <input 
                name="name" 
                className="form-control" 
                id="location-name" 
                defaultValue={props.location.name}/>
        </div>
        <div className="form-row">
        <div className="form-group col-md-6">
            <label htmlFor="location-coordinates-lat" className="col-form-label">Gps latitude</label>
            <input 
                name="lat" 
                className="form-control" 
                id="location-coordinates-lat" 
                defaultValue={props.location.coordinates.lat}/>
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="location-coordinates-lon" className="col-form-label">Gps longitude</label>
            <input 
                name="lon" 
                className="form-control" 
                id="location-coordinates-lon" 
                defaultValue={props.location.coordinates.lon}/>
        </div>
        </div>
        <div className="form-group">
            <label htmlFor="location-description">Description</label>
            <textarea 
                name="description" 
                className="form-control" 
                rows="5" id="location-description" 
                defaultValue={props.location.description}></textarea>
        </div>
    </form>)
}