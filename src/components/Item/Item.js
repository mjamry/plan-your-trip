import React, {Component} from 'react';

class Item extends Component {
  render(){
    return (
      <div className="Item">
        <div className="item-position"></div>
        <div className="item-name"><a href={this.props.value.link}>{this.props.value.name}</a></div>
        <div className="item-description">{this.props.value.description}</div>
        <div className="item-attractiveness">{this.props.value.attractivness}</div>
      </div>
    )
  }
}

export default Item;