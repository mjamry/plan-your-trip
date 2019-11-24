
import './App.css';

import React from 'react';
import LocationsView from './components/Locations/LocationsView'
import MapView from './components/MapView'
import Header from './components/Header'
import { LocationsStateProvider } from './State/LocationsState'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

var App = () => {
  return (
    <div className="App">
      <LocationsStateProvider>
        <Header />
        <div className="row container-fluid no-gutters">
          <div className="col-7">
            <LocationsView />
          </div>
          <div className="col-5">
            <MapView />
          </div>
        </div>
      </LocationsStateProvider>
    </div>
  );
}

export default App;
