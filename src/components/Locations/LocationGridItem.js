import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var LocationGridItem = (props) => {
  return (
    <div className="Gridlocation">
      <div className="card">
        <img className="grid-location-image" src={props.location.image} alt={props.location.name}></img>
        <div className="card-body">
          <h5 className="card-title grid-location-name" 
            onClick={props.onSelect}>{props.location.name}</h5>
          <p className="card-text grid-location-description" title={props.location.description}>{props.location.description}</p>
          <hr></hr>
          <div className="row container">
            <p className="col-8 grid-location-coordinates">
              <FontAwesomeIcon icon="map-marker"/>{props.location.coordinates.lat}, {props.location.coordinates.lon}</p>
            <p className="col-2">{props.location.attractivness}</p>
            <p className="col-2 grid-location-remove">
              <FontAwesomeIcon 
                icon="trash-alt" 
                title="remove location" 
                onClick={props.onRemove}/></p>
            <p className="col-2 grid-location-remove">
              <FontAwesomeIcon 
                icon="edit" 
                title="edit location" 
                onClick={props.onEdit}/></p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default LocationGridItem;