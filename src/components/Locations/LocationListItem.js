import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var LocationListItem = (props) => {
  return (
    <div className="location-row-container">
      <img className="location-row-image" src={props.location.image} alt={props.location.name}></img>
      <div className="location-row-name" 
        title={props.location.link} 
        onClick={props.onSelect}>{props.location.name}</div>
      <div className="location-row-description" title={props.location.description}>{props.location.description}</div>
      <div className="location-row-attractivness">{props.location.attractivness}</div>
      <div className="location-row-buttons">
      <FontAwesomeIcon 
        icon="trash-alt" 
        title="remove location" 
        className="location-row-button" 
        onClick={props.onRemove}/>
      <FontAwesomeIcon 
        icon="edit" 
        title="edit location" 
        className="location-row-button" 
        onClick={props.onEdit}/>
      </div>
  </div>
  )
}

export default LocationListItem;