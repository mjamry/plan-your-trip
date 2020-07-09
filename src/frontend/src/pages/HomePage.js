
import React from 'react'
import LocationsView from './../components/Locations/LocationsView'
import LocationsMapView from './../components/MapView/LocationsMapView'
import ListView from './../components/Lists/ListView'
import ListViewMenu from './../components/Lists/ListViewMenu'
import AppLoader from './../AppLoader'
import {useAppState} from './../State/AppState'
import {Link} from 'react-router-dom'

const HomePage = () => {
  const [appState, dispatchAppState] = useAppState();

    return (
      <div>
          <AppLoader/>
          <Link to="/Lists">Lists</Link>
          {appState.appInitialized && 
            <div className="app-content-container">
              <div className="app-locations-view">
                <ListView />
                <ListViewMenu />
                <LocationsView />
              </div>
              {/* <div className="app-map-view">
                <LocationsMapView />
              </div> */}
            </div>
          }
      </div>
    )
}

export default HomePage;