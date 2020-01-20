
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
import './Styles/Confirmation.css'
import './Styles/LoadingIndicator.css'
import './Styles/ToasterNotifications.css'

import React from 'react';
import LocationsView from './components/Locations/LocationsView'
import LocationsMapView from './components/MapView/LocationsMapView'
import Header from './components/Header'
import ModalContainer from './components/modals/ModalContainer'
import DbPersistentLocationStateProvider from './State/DbPersistentLocationState'
import NotificationStateProvider from './State/NotificationState'
import { ModalStateProvider } from './State/ModalStateProvider'
import LocationsDataDownloader from './components/LocationsDataDownloader'
import ToasterNotifications from './components/ToasterNotifications'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'

library.add(fas, faWikipediaW)

var App = () => {
  return (
    <div className="App">
      <NotificationStateProvider>
      <ToasterNotifications/>
      <DbPersistentLocationStateProvider>
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
      </DbPersistentLocationStateProvider>
      </NotificationStateProvider>
    </div>
  );
}

export default App;
