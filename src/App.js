
import './App.css';

import React from 'react';
import LocationsView from './components/Locations/LocationsView'
import MapView from './components/MapView'
import Header from './components/Header'
import ModalContainer from './components/modals/ModalContainer'
import { LocationsStateProvider } from './State/LocationsState'
import { ModalStateProvider } from './State/ModalStateProvider'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

var App = () => {
  return (
    <div className="App">
      <LocationsStateProvider>
      <ModalStateProvider>
        <ModalContainer />
        <Header />
        <div className="app-content-container">
          <div className="app-locations-view">
            <LocationsView />
          </div>
          <div className="app-map-view">
            <MapView />
          </div>
        </div>
      </ModalStateProvider>
      </LocationsStateProvider>
    </div>
  );
}

export default App;
