import React, {useState, useEffect} from 'react';
import Modal from '../../Common/Modal';

const EMPTY_ITEM_DATA = {
    name: "",
    description: "",
    coordinates: {lat: "", lon: ""}
}

var LocationDetailsForm = (props) => {
    const [location, setLocation] = useState(EMPTY_ITEM_DATA);
    const [dataReady, setDataReady] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        if(props.item !== null)
        {
            setLocation(props.item);
            setDataReady(true);
            setShowModal(true);
        }
    }, [props.item])

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
        setLocation(EMPTY_ITEM_DATA);
        setDataReady(false);
        setShowModal(false);
    }

    var renderForm = () => {
        return(<form>
            <div className="form-group">
                <label htmlFor="item-name" className="col-form-label">Name</label>
                <input name="name" onChange={handleFormChanged} className="form-control" id="item-name" value={location.name}/>
            </div>
            <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="item-coordinates-lat" className="col-form-label">Gps latitude</label>
                <input name="lat" onChange={handleGpsFormChanged} className="form-control" id="item-coordinates-lat" value={location.coordinates.lat}/>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="item-coordinates-lon" className="col-form-label">Gps longitude</label>
                <input name="lon" onChange={handleGpsFormChanged} className="form-control" id="item-coordinates-lon" value={location.coordinates.lon}/>
            </div>
            </div>
            <div className="form-group">
                <label htmlFor="item-description">Description</label>
                <textarea name="description" onChange={handleFormChanged} className="form-control" rows="5" id="item-description" value={location.description}></textarea>
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
        return(
            <div>
                <button type="submit" className="btn btn-primary" onClick={onSubmit} data-dismiss="modal">Save</button>
                <button type="button" className="btn" data-dismiss="modal" onClick={clearData}>Cancel</button>
            </div>
        );
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

export default LocationDetailsForm;