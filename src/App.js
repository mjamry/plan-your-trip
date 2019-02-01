import React, { Component } from 'react';
import './App.css';
import ItemsList from './components/Items/ItemsList'
import Menu from './components/Menu/Menu'
import MapView from './components/MapView'
import Header from './components/Header'
import store from 'store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FileGenerator from './components/FileGenerator';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      itemsList: [],
      selectedItem: undefined
    }
  }

  handleSearchFinished = (newItem) => {
    this.setState(prevState => ({
      itemsList: [...prevState.itemsList, newItem],
      selectedItem: undefined
    }));
  }

  handleItemRemoved = (itemIndex) => {
    var arr = [...this.state.itemsList];
    arr.splice(parseInt(itemIndex),1);
    this.setState({itemsList: arr})
  }
  
  handleItemSelected = (itemIndex) => {
    this.setState({selectedItem: this.state.itemsList[parseInt(itemIndex)]})
  }

  removeAllItems = () => {
    this.setState({itemsList: []})
  }
 
  componentDidMount(){
    this.setState({itemsList: store.get('items')})
  }

  componentDidUpdate(){
    store.set('items', this.state.itemsList);
  }

  render() {
    return (
      <div className="App">
        <Header onSearchFinished={this.handleSearchFinished}/>
        <div className="row container-flex no-gutters">
          <div className="col-1">
            <Menu />
            <FontAwesomeIcon icon="trash-alt" title="remove all items" className="item-delete fa-2x" onClick={this.removeAllItems}/>
                <FileGenerator waypoints={this.state.itemsList}/>
          </div>
          <div className="col-sm">
            <ItemsList list={this.state.itemsList} onRemoved={this.handleItemRemoved} onSelected={this.handleItemSelected}/>
          </div>
          <div className="col-5">
            <MapView points={this.state.itemsList} selected={this.state.selectedItem}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
