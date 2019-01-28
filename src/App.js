import React, { Component } from 'react';
import './App.css';
import ItemsList from './components/ItemsList/ItemsList'
import Menu from './components/Menu/Menu'
import Search from './components/Search/Search'
import MapView from './components/Map/MapView'
import store from 'store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <Menu />
        <Search onFinished={this.handleSearchFinished}/>
              <FontAwesomeIcon icon="trash-alt" title="remove all items" className="item-delete fa-2x" onClick={this.removeAllItems}/>
        <ItemsList list={this.state.itemsList} onRemoved={this.handleItemRemoved}/>
        <MapView points={this.state.itemsList}/>
      </div>
    );
  }
}

export default App;
