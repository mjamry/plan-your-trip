
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

import React, { useEffect, useState } from 'react';
import {Route} from 'react-router-dom'
import ModalContainer from './components/modals/ModalContainer'
import LocationActionLoadingIndicator from './components/LocationActionLoadingIndicator'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'

import DashboardPage from './pages/DashboardPage'
import CallbackPage from './pages/CallbackPage'
import WelcomePage from './pages/WelcomePage'
import ListsPage from './pages/ListsPage'
import LocationsPage from './pages/LocationsPage'
import PlansPage from './pages/PlansPage'
import PlanDetailsPage from './pages/PlanDetailsPage'

import PageLayout from './pages/PageLayout'
import PrivateRoute from './components/PrivateRoute.js'
import useAppSettingsService from './Services/AppSettingsService'

library.add(far, fas, faWikipediaW)

var App = () => {
  const appSettingsService = useAppSettingsService();
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    console.log("APP_INIT")
    appSettingsService.init().then(() => {
      setIsAppLoaded(true);
    });
  }, [])

  return (
    <>
      {isAppLoaded
      ? <div className="App">
        <LocationActionLoadingIndicator/>
        <ModalContainer />
        <PageLayout>
          <PrivateRoute path='/' exact component={DashboardPage} />
          <PrivateRoute path='/locations' exact component={ListsPage} />
          <PrivateRoute path='/locations/:id' component={LocationsPage} />
          <PrivateRoute path='/callback' component={CallbackPage} />
          <Route path='/welcome' component={WelcomePage} />
          <PrivateRoute path='/plans' exact component={PlansPage} />
          <PrivateRoute path='/plans/:id' component={PlanDetailsPage} />
        </PageLayout>
      </div>
      //TODO add proper loader here instead of this placeholder
      : "LOADING"}
    </>
  );
}

export default App;
