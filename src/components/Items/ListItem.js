import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ListItem extends Component {
  render(){
    return (
      <div className="ListItem row">
        <div className="row col-2">
          <img className="list-item-image" src={this.props.value.image} alt={this.props.value.name}></img>
        </div>
        <div className="list-item-details row col-10">
          <div className="list-item-name col-2" title={this.props.value.link} onClick={()=>this.props.onSelected(this.props.index)}>{this.props.value.name}</div>
          <div className="list-item-description col-8" title={this.props.value.description}>{this.props.value.description}</div>
          <div className="row col-2">
            <div className="list-item-attractiveness col-4">{this.props.value.attractivness}</div>
            <div className="col-8">
              <FontAwesomeIcon icon="trash-alt" title="remove item" className="list-item-delete fa-2x" onClick={()=>this.props.onRemoved(this.props.index)}/>
            </div>
          </div>
        </div>
               
      </div>
    )
  }
}

export default ListItem;