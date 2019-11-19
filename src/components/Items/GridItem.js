import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var GridItem = (props) => {
  return (
    <div className="GridItem">
      <div class="card">
        <img className="grid-item-image" src={props.value.image} alt={props.value.name}></img>
        <div className="card-body">
          <h5 className="card-title grid-item-name" onClick={()=>props.onSelected(props.index)}>{props.value.name}</h5>
          <p className="card-text grid-item-description" title={props.value.description}>{props.value.description}</p>
          <hr></hr>
          <div className="row container">
            <p className="col-8 grid-item-coordinates"><FontAwesomeIcon icon="map-marker"/> 43°41′S 170°10′E</p>
            <p className="col-2">{props.value.attractivness}</p>
            <p className="col-2 grid-item-remove"><FontAwesomeIcon icon="trash-alt" title="remove item" onClick={()=>props.onRemoved(props.index)}/></p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default GridItem;