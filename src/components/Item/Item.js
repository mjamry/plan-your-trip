import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class Item extends Component {
  render(){
    return (
      <div className="Item row">
        <div className="item-position col-1"></div>
        <div className="item-name col-3" title={this.props.value.link}><a href={this.props.value.link} target="_blank" rel="noopener noreferrer">{this.props.value.name}</a></div>
        <div className="item-description col-6" title={this.props.value.description}>{this.props.value.description}</div>
        <div className="item-attractiveness col-2">{this.props.value.attractivness}</div>
      </div>
    )
  }
}

export default Item;