import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LocationsStatusActions, useLocationsState } from '../../State/LocationsState'

var LocationGridItem = (props) => {
  const [{}, dispatch] = useLocationsState();

  return (
    <div className="Gridlocation">
      <div className="card">
        <img className="grid-location-image" src={props.location.image} alt={props.location.name}></img>
        <div className="card-body">
          <h5 className="card-title grid-location-name" 
            onClick={()=>dispatch({type: LocationsStatusActions.selectOnMap, data: props.location})}>{props.location.name}</h5>
          <p className="card-text grid-location-description" title={props.location.description}>{props.location.description}</p>
          <hr></hr>
          <div className="row container">
            <p className="col-8 grid-location-coordinates">
              <FontAwesomeIcon icon="map-marker"/> 43°41′S 170°10′E</p>
            <p className="col-2">{props.location.attractivness}</p>
            <p className="col-2 grid-location-remove">
              <FontAwesomeIcon 
                icon="trash-alt" 
                title="remove location" 
                onClick={()=>dispatch({type: LocationsStatusActions.removeLocation, data: props.location})}/></p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default LocationGridItem;