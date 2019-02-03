import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class GridItem extends Component {
  render(){
    return (
      <div className="GridItem">
        <div class="card">
          <img className="grid-item-image" src={this.props.value.image} alt={this.props.value.name}></img>
          <div className="card-body">
            <h5 className="card-title grid-item-name" onClick={()=>this.props.onSelected(this.props.index)}>{this.props.value.name}</h5>
            <p className="card-text grid-item-description" title={this.props.value.description}>{this.props.value.description}</p>
            <hr></hr>
            <div className="row container">
              <p className="col-6 grid-item-coordinates"><FontAwesomeIcon icon="map-marker"/> 43°41′S 170°10′E</p>
              <p className="col-2 grid-item-remove"><FontAwesomeIcon icon="trash-alt" onClick={()=>this.props.onRemoved(this.props.index)}/></p>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

export default GridItem;