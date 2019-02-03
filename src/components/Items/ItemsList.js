import React, {Component} from 'react';
import ListItem from './ListItem'
import ItemsListMenu from './ItemsListMenu';
import GridItem from './GridItem';

class ItemsList extends Component {
  renderList = () => {
    var output = [];
    for(var item in this.props.list)
    {
      output.push(<ListItem value={this.props.list[item]} onSelected={this.props.onSelected} onRemoved={this.handleItemRemoved} key={item} index={item}></ListItem>)
    }

    return output;
  }

  renderGrid = () => {
    var output = [];
    for(var item in this.props.list){
      output.push(<GridItem value={this.props.list[item]} onSelected={this.props.onSelected} onRemoved={this.handleItemRemoved} key={item} index={item}></GridItem>)
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
        <div className="card-columns">{this.renderGrid()}</div>
        
      </div>
    )
    }
  }

export default ItemsList;