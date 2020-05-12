import React from 'react';
import LocationButtons from './LocationButtons'
import LocationAttractivnessButton from './LocationAttractivnessButton'

var LocationGridItem = (props) => {
  return (
    <div className="location-card">
      <img className="location-card-image" src={props.location.image} alt={props.location.name}></img>
      <h5 className="location-card-name" onClick={props.onSelect}>{props.location.name}</h5>
      <p className="location-card-description" title={props.location.description}>{props.location.description}</p>
      <div className="location-card-bottom-container">
        <LocationAttractivnessButton value={props.location.attractivness}/>
        <LocationButtons onEdit={props.onEdit} onRemove={props.onRemove} />
      </div>
      
    </div>
        
  )
}

export default LocationGridItem;