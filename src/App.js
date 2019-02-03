import React, { Component } from 'react';
import './App.css';
import ItemsList from './components/Items/ItemsList'
import MapView from './components/MapView'
import Header from './components/Header'
import store from 'store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

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
        {/* */}
        <Header onSearchFinished={this.handleSearchFinished}/>
        <div className="row container-fluid no-gutters">
          <div className="col-7">
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
