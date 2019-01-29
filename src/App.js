import React, { Component } from 'react';
import './App.css';
import ItemsList from './components/ItemsList/ItemsList'
import Menu from './components/Menu/Menu'
import Search from './components/Search/Search'
import MapView from './components/Map/MapView'
import store from 'store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GpxFileGenerator from './GpxFileGenerator';
import FileGenerator from './components/FileGenerator/FileGenerator';

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

  removeAllItems = () => {
    this.setState({itemsList: []})
  }

  generateGpxFile = () => {
    GpxFileGenerator.Generate(this.state.itemsList).then(console.log)
  }

  handleItemSelected = (itemIndex) => {
    this.setState({selectedItem: this.state.itemsList[parseInt(itemIndex)]})
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
        <Menu />
        <Search onFinished={this.handleSearchFinished}/>
              <FontAwesomeIcon icon="trash-alt" title="remove all items" className="item-delete fa-2x" onClick={this.removeAllItems}/>
              <FileGenerator waypoints={this.state.itemsList}/>
        <ItemsList list={this.state.itemsList} onRemoved={this.handleItemRemoved} onSelected={this.handleItemSelected}/>
        <MapView points={this.state.itemsList} selected={this.state.selectedItem}/>
      </div>
    );
  }
}

export default App;
