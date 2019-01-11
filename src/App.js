import React, { Component } from 'react';
import './App.css';
import ItemsList from './components/ItemsList/ItemsList'
import ItemDetails from './ItemDetails'

class App extends Component {
  itemsList = [
    new ItemDetails("Lake", "Biggest lake", 4, "...", "...", "..."),
    new ItemDetails("Mountain", "Highest lake", 2, "...", "...", "..."),
    new ItemDetails("Cave", "Longest lake", 5, "...", "...", "..."),
    new ItemDetails("Hole", "Deepest lake", 1, "...", "...", "..."),
  ];

  render() {
    return (
      <div className="App">
        <ItemsList list={this.itemsList} />
      </div>
    );
  }
}

export default App;
