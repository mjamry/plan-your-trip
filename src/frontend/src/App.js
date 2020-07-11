
import './Styles/App.css';
import './Styles/LocationsView.css'
import './Styles/LocationsViewMenu.css'
import './Styles/LocationViewRow.css'
import './Styles/LocationViewCard.css'
import './Styles/RatingButton.css'
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
import './Styles/WelcomePage.css'
import './Styles/ListDetailsForm.css'
import './Styles/ListsPage.css'

import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import ModalContainer from './components/modals/ModalContainer'
import LocationActionLoadingIndicator from './components/LocationActionLoadingIndicator'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'

import AppContext from './AppContext'
import HomePage from './pages/HomePage'
import CallbackPage from './pages/CallbackPage'
import WelcomePage from './pages/WelcomePage'
import ListsPage from './pages/ListsPage'
import LocationsPage from './pages/LocationsPage'

import PageLayout from './pages/PageLayout'
import PrivateRoute from './components/PrivateRoute.js'

library.add(far, fas, faWikipediaW)

var App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContext>
          <LocationActionLoadingIndicator/>
          <ModalContainer />
          <PageLayout>
            <PrivateRoute path='/' exact component={HomePage} />
            <PrivateRoute path='/locations' exact component={ListsPage} />
            <PrivateRoute path='/locations/:id' component={LocationsPage} />
            <PrivateRoute path='/callback' component={CallbackPage} />
            <PrivateRoute path='/welcome' component={WelcomePage} />
          </PageLayout>
        </AppContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
