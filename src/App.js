import React, { useState, useEffect } from 'react';
import './App.css';
import LocationsView from './components/Locations/LocationsView'
import MapView from './components/MapView'
import Header from './components/Header'
import store from 'store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

var App = () => {
  const [locations, setLocations] = useState([]);
  const [selectedItem, setSelectedItem] = useState(undefined);

  var handleSearchFinished = (newLocation) => {
    setLocations([...locations, newLocation]);
  }

  var handleItemRemoved = (locationIndex) => {
    var newLocations = [...locations];
    newLocations.splice(parseInt(locationIndex), 1);

    setLocations(newLocations);
  }

  var handleItemSelected = (locationIndex) => {
    setSelectedItem(locations[parseInt(locationIndex)]);
  }

  var handleRemoveAllItems = () => {
    setLocations([]);
  }

  useEffect(()=>{
    setLocations(store.get('locations', []));
  }, [])

  useEffect(()=>{
    store.set('locations', locations);
  }, [locations])

  return (
    <div className="App">
      <Header onSearchFinished={handleSearchFinished}/>
      <div className="row container-fluid no-gutters">
        <div className="col-7">
          <LocationsView 
            list={locations} 
            onRemoved={handleItemRemoved} 
            onSelected={handleItemSelected} 
            onAllItemsRemoved={handleRemoveAllItems}/>
        </div>
        <div className="col-5">
          <MapView 
            points={locations} 
            selected={selectedItem}/>
        </div>
      </div>
    </div>
  );
}

export default App;
