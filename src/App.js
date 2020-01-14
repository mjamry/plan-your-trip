
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
import './Styles/AddNewLocationSelect.css'
import './Styles/Search.css'

import React from 'react';
import LocationsView from './components/Locations/LocationsView'
import LocationsMapView from './components/MapView/LocationsMapView'
import Header from './components/Header'
import ModalContainer from './components/modals/ModalContainer'
import DbPersistentLocationState from './State/DbPersistentLocationState'
import { ModalStateProvider } from './State/ModalStateProvider'
import LocationsDataDownloader from './components/LocationsDataDownloader'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

var App = () => {
  return (
    <div className="App">
      <DbPersistentLocationState>
      <LocationsDataDownloader />
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
      </DbPersistentLocationState>
    </div>
  );
}

export default App;
