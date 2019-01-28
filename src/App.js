import React, { Component } from 'react';
import './App.css';
import ItemsList from './components/ItemsList/ItemsList'
import Menu from './components/Menu/Menu'
import Search from './components/Search/Search'
import MapView from './components/Map/MapView'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      itemsList: []
    }
  }

  handleSearchFinished = (newItem) => {
    this.setState(prevState => ({
      itemsList: [...prevState.itemsList, newItem]
    }));
  }

  handleItemRemoved = (itemIndex) => {
    var arr = [...this.state.itemsList];
    arr.splice(parseInt(itemIndex),1);
    this.setState({itemsList: arr})
  }

  render() {
    return (
      <div className="App">
        <Menu />
        <Search onFinished={this.handleSearchFinished}/>
        <ItemsList list={this.state.itemsList} onRemoved={this.handleItemRemoved}/>
        <MapView points={this.state.itemsList}/>
      </div>
    );
  }
}

export default App;
