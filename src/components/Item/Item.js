import React, {Component} from 'react';
import './Item.css';

class Item extends Component {
  render(){
    return (
      <div className="Item">
        <div className="item-position">1</div>
        <div className="item-name">Lake</div>
        <div className="item-description">Best Lake</div>
        <div className="item-attractiveness">5</div>
      </div>
    )
  }
}

export default Item;