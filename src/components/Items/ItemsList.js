import React, {Component} from 'react';
import Item from './Item'
import ItemsListMenu from './ItemsListMenu';

class ItemsList extends Component {
  renderList = () => {
    var output = [];
    for(var item in this.props.list)
    {
      output.push(<Item value={this.props.list[item]} onSelected={this.props.onSelected} onRemoved={this.handleItemRemoved} key={item} index={item}></Item>)
    }

    return output;
  }

  handleItemRemoved = (index) => {
    this.props.onRemoved(index);
  }

  render(){
    return (
      <div className="ItemList container">
        <div className="sticky-top">
          <ItemsListMenu waypoints={this.props.list}/>      
        </div>
        {this.renderList()}
      </div>
    )
    }
  }

export default ItemsList;