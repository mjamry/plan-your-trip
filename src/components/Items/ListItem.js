import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var ListItem = (props) => {
  return (
    <div className="ListItem row">
      <div className="row col-2">
        <img className="list-item-image" src={props.value.image} alt={props.value.name}></img>
      </div>
      <div className="list-item-details row col-10">
        <div className="list-item-name col-2" title={props.value.link} onClick={()=>props.onSelected(props.index)}>{props.value.name}</div>
        <div className="list-item-description col-8" title={props.value.description}>{props.value.description}</div>
        <div className="row col-2">
          <div className="list-item-attractiveness col-4">{props.value.attractivness}</div>
          <div className="col-8">
            <FontAwesomeIcon icon="trash-alt" title="remove item" className="list-item-delete fa-2x" onClick={()=>props.onRemoved(props.index)}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem;