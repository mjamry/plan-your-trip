import React, {Component} from 'react';
import ListItem from './ListItem'
import ItemsListMenu from './ItemsListMenu';
import GridItem from './GridItem';

class ItemsList extends Component {
  state = {viewContent: ()=>{}}
  componentDidMount(){
    this.setState({viewContent: this.renderGrid})
  }

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

    return (<div className="card-columns">{output}</div>);
  }

  handleItemRemoved = (index) => {
    this.props.onRemoved(index);
  }

  handleListSelected = () =>{
    this.setState({viewContent: this.renderList})
  }

  handleGridSelected = () => {
    this.setState({viewContent: this.renderGrid})
  }

  render(){
    return (
      <div className="ItemList container">
        <div className="sticky-top">
          <ItemsListMenu waypoints={this.props.list} onListSelected={this.handleListSelected} onGridSelected={this.handleGridSelected}/>      
        </div>
        {this.state.viewContent()}
      </div>
    )
  }
}

export default ItemsList;