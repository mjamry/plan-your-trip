import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from '../Item'
import './ItemList.css';

class ItemList extends Component {
  renderList = () => {
    for(var item in this.props.items)
    {
      return <Item value={item}></Item>
    }
  }

  render(){
    return (
      <div className="ItemList">
        {this.renderList()}
      </div>
    )
    }
  }

export default ItemList;