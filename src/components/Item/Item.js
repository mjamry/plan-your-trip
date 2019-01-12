import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class Item extends Component {
  render(){
    return (
      <div className="Item row">
        <div className="item-position col-1"></div>
        <div className="item-name col-3"><a href={this.props.value.link}>{this.props.value.name}</a></div>
        <div className="item-description col-6">{this.props.value.description}</div>
        <div className="item-attractiveness col-2">{this.props.value.attractivness}</div>
      </div>
    )
  }
}

export default Item;