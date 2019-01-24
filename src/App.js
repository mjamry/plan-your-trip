import React, { Component } from 'react';
import './App.css';
import ItemsList from './components/ItemsList/ItemsList'
import Menu from './components/Menu/Menu'
import Search from './components/Search/Search'

class App extends Component {
  constructor(props){
    super(props);

    this.handleSearchFinished = this.handleSearchFinished.bind(this);

    this.state = {
      itemsList: []
    }
  }

  handleSearchFinished(newItem){
    this.setState(prevState => ({
      itemsList: [...prevState.itemsList, newItem]
    }));
    console.log(newItem)
  }

  render() {
    return (
      <div className="App">
        <Menu />
        <Search onFinished={this.handleSearchFinished}/>
        <ItemsList list={this.state.itemsList} />
      </div>
    );
  }
}

export default App;
