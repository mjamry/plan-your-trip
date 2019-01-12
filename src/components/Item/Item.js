import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './Item.css'

class Item extends Component {
  render(){
    return (
      <div className="Item row">
        <div className="item-position col-1" class="col-1"></div>
        <div className="item-name" class="col-3"><a href={this.props.value.link}>{this.props.value.name}</a></div>
        <div className="item-description" class="col-6">{this.props.value.description}</div>
        <div className="item-attractiveness" class="col-2">{this.props.value.attractivness}</div>
      </div>
    )
  }
}

export default Item;