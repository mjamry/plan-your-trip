import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var LocationListItem = (props) => {
  return (
    <div className="Listlocation row">
      <div className="row col-2">
        <img className="list-location-image" src={props.value.image} alt={props.value.name}></img>
      </div>
      <div className="list-location-details row col-10">
        <div className="list-location-name col-2" title={props.value.link} onClick={()=>props.onSelected(props.index)}>{props.value.name}</div>
        <div className="list-location-description col-8" title={props.value.description}>{props.value.description}</div>
        <div className="row col-2">
          <div className="list-location-attractiveness col-4">{props.value.attractivness}</div>
          <div className="col-8">
            <FontAwesomeIcon icon="trash-alt" title="remove location" className="list-location-delete fa-2x" onClick={()=>props.onRemoved(props.index)}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationListItem;