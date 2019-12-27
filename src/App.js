
import './Styles/App.css';
import './Styles/LocationsView.css'
import './Styles/LocationsViewMenu.css'
import './Styles/LocationViewRow.css'
import './Styles/LocationViewCard.css'
import './Styles/LocationAttractivness.css'
import './Styles/Modal.css'
import './Styles/LocationEditForm.css'
import './Styles/SearchResult.css'
import './Styles/Header.css'
import './Styles/MapView.css'

import React from 'react';
import LocationsView from './components/Locations/LocationsView'
import LocationsMapView from './components/MapView/LocationsMapView'
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
            <LocationsMapView />
          </div>
        </div>
      </ModalStateProvider>
      </LocationsStateProvider>
    </div>
  );
}

export default App;
