import React, {Component} from 'react';
import Item from '../Item/Item'

class ItemsList extends Component {
  renderList = () => {
    var output = [];
    for(var item in this.props.list)
    {
      output.push(<Item value={this.props.list[item]}></Item>)
    }

    return output;
  }

  render(){
    return (
      <div className="ItemList container">
        {this.renderList()}
      </div>
    )
    }
  }

export default ItemsList;