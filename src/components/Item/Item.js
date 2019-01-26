import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Item extends Component {
  render(){
    return (
      <div className="Item row">
        <div className="row col-2">
          <img className="item-image" src={this.props.value.image} alt={this.props.value.name}></img>
        </div>
        <div className="item-details row col-10">
          <div className="item-name col-2" title={this.props.value.link}><a href={this.props.value.link} target="_blank" rel="noopener noreferrer">{this.props.value.name}</a></div>
          <div className="item-description col-8" title={this.props.value.description}>{this.props.value.description}</div>
          <div className="row col-2">
            <div className="item-attractiveness col-4">{this.props.value.attractivness}</div>
            <div className="col-8">
              <FontAwesomeIcon icon="trash-alt" title="remove item" className="item-delete fa-2x" onClick={()=>this.props.onRemoved(this.props.index)}/>
            </div>
          </div>
        </div>
               
      </div>
    )
  }
}

export default Item;