import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
        <IconButton aria-label="delete" onClick={props.onRemove}>
          <DeleteIcon/>
        </IconButton>
        <IconButton aria-label="delete" onClick={props.onEdit}>
          <EditIcon/>
        </IconButton>
      </div>
  </div>
  )
}

export default LocationListItem;