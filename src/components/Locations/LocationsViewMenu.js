import React from 'react';
import GpxFileDownloader from '../../Common/GpxFileDownloader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocationsState, LocationsStateActions } from '../../State/LocationsState'

var LocationsViewMenu = (props) => {
  const [{locations}, dispatch] = useLocationsState();

  return (
    <div className="locationsListMenu">
        <ul className="nav justify-content-end">
          <li className="nav-locations-list-menu-location" onClick={props.onListSelected}>
            <FontAwesomeIcon icon='th-list' className='fa-2x' title='show as list'/>
          </li>
          <li className="nav-locations-list-menu-location" onClick={props.onGridSelected}>
            <FontAwesomeIcon icon='th-large' className='fa-2x' title='show as grid'/>
          </li>
          <li className="nav-locations-list-menu-location">
            <FontAwesomeIcon 
              icon="trash-alt" 
              title="remove all locations" 
              className="location-delete fa-2x" 
              onClick={()=>dispatch({type: LocationsStateActions.removeAllLocations})}/>
          </li>
          <li className="nav-locations-list-menu-location">
          <FontAwesomeIcon 
            icon="file-download" 
            title="generate gpx file" 
            className="location-delete fa-2x" 
            onClick={()=>GpxFileDownloader.download(locations)}/>
          </li>
        </ul>
    </div>
  )
}

export default LocationsViewMenu;