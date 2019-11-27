import React, {useState, useEffect} from 'react';
import Modal from '../modals/Modal';

const EMPTY_location_DATA = {
    name: "",
    description: "",
    coordinates: {lat: "", lon: ""}
}

var LocationDetailsForm = (props) => {
    const [location, setLocation] = useState(EMPTY_location_DATA);
    const [dataReady, setDataReady] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        if(props.location !== null)
        {
            setLocation(props.location);
            setDataReady(true);
            setShowModal(true);
        }
    }, [props.location])

    var handleFormChanged = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLocation(
            {
                ...location, 
                [name]: value
            });
    }

    var handleGpsFormChanged = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLocation(
            {
                ...location,
                coordinates: {
                    ...location.coordinates,
                    [name]: value
                }
            }
        )
    }

    var onSubmit = () => {
        props.onFinished(location);
        clearData()
    }

    var clearData = () => {
        setLocation(EMPTY_location_DATA);
        setDataReady(false);
        setShowModal(false);
    }

    var renderForm = () => {
        return(<form>
            <div className="form-group">
                <label htmlFor="location-name" className="col-form-label">Name</label>
                <input name="name" onChange={handleFormChanged} className="form-control" id="location-name" value={location.name}/>
            </div>
            <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="location-coordinates-lat" className="col-form-label">Gps latitude</label>
                <input name="lat" onChange={handleGpsFormChanged} className="form-control" id="location-coordinates-lat" value={location.coordinates.lat}/>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="location-coordinates-lon" className="col-form-label">Gps longitude</label>
                <input name="lon" onChange={handleGpsFormChanged} className="form-control" id="location-coordinates-lon" value={location.coordinates.lon}/>
            </div>
            </div>
            <div className="form-group">
                <label htmlFor="location-description">Description</label>
                <textarea name="description" onChange={handleFormChanged} className="form-control" rows="5" id="location-description" value={location.description}></textarea>
            </div>
        </form>)
    }

    var renderLoader = () => {
        return(
            <div className="d-flex justify-content-center">
                <span>Loading...</span>
            </div>
        );
    }

    var renderFooter = ()  => {
        ;
    }

    return(
        <div>
            <Modal 
                show={showModal} 
                content={dataReady ? renderForm() : renderLoader()}
                header="Edit details" 
                footer={renderFooter()}/>
        </div>
    )
};

export const LocationDetailsFormModalFooter = (props) => {
    return(
        <div>
            <button type="submit" className="btn btn-primary" onClick="" data-dismiss="modal">Save</button>
            <button type="button" className="btn" data-dismiss="modal" onClick="">Cancel</button>
        </div>
    )
}

export const LocationDetailsFormHeader = (props) => {
    return(
        <div>Location FORM</div>
    )
}

export const LocationDetailsFormBody = (props) => {
    return(<form>
        <div className="form-group">
            <label htmlFor="location-name" className="col-form-label">Name</label>
            <input name="name" onChange="" className="form-control" id="location-name" value=""/>
        </div>
        <div className="form-row">
        <div className="form-group col-md-6">
            <label htmlFor="location-coordinates-lat" className="col-form-label">Gps latitude</label>
            <input name="lat" onChange="" className="form-control" id="location-coordinates-lat" value=""/>
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="location-coordinates-lon" className="col-form-label">Gps longitude</label>
            <input name="lon" onChange="" className="form-control" id="location-coordinates-lon" value=""/>
        </div>
        </div>
        <div className="form-group">
            <label htmlFor="location-description">Description</label>
            <textarea name="description" onChange="" className="form-control" rows="5" id="location-description" value=""></textarea>
        </div>
    </form>)
}

export default LocationDetailsForm;