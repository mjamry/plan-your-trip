
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
import './Styles/LocationActionLoadingIndicator.css'
import './Styles/DropDown.css'
import './Styles/ListView.css'
import './Styles/AppLoader.css'

import React from 'react';
import LocationsView from './components/Locations/LocationsView'
import LocationsMapView from './components/MapView/LocationsMapView'
import Header from './components/Header'
import ModalContainer from './components/modals/ModalContainer'
import LocationActionLoadingIndicator from './components/LocationActionLoadingIndicator'
import ListView from './components/Lists/ListView'
import ListViewMenu from './components/Lists/ListViewMenu'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'

import AppLoader from './AppLoader'
import AppContext from './AppContext'

library.add(far, fas, faWikipediaW)

var App = () => {
  return (
    <div className="App">
      <AppContext>
        <LocationActionLoadingIndicator/>
        <AppLoader/>
        <ModalContainer />
        <Header />
        <div className="app-content-container">
          <div className="app-locations-view">
            <ListView />
            <ListViewMenu />
            <LocationsView />
          </div>
          <div className="app-map-view">
            <LocationsMapView />
          </div>
        </div>
      </AppContext>
    </div>
  );
}

export default App;
