import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var LocationListItem = (props) => {
  return (
    <div className="Listlocation row">
      <div className="row col-2">
        <img className="list-location-image" src={props.location.image} alt={props.location.name}></img>
      </div>
      <div className="list-location-details row col-10">
        <div className="list-location-name col-2" 
          title={props.location.link} 
          onClick={props.onSelect}>{props.location.name}</div>
        <div className="list-location-description col-8" title={props.location.description}>{props.location.description}</div>
        <div className="row col-2">
          <div className="list-location-attractiveness col-4">{props.location.attractivness}</div>
          <div className="col-8">
            <FontAwesomeIcon 
              icon="trash-alt" 
              title="remove location" 
              className="list-location-delete fa-2x" 
              onClick={props.onRemove}/>
            <FontAwesomeIcon 
              icon="edit" 
              title="edit location" 
              className="list-location-delete fa-2x" 
              onClick={props.onEdit}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationListItem;