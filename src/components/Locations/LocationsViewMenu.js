import React from 'react';
import FileGenerator from '../FileGenerator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var LocationsViewMenu = (props) => {
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
            <FontAwesomeIcon icon="trash-alt" title="remove all locations" className="location-delete fa-2x" onClick={props.onAlllocationsRemoved}/>
          </li>
          <li className="nav-locations-list-menu-location">
            <FileGenerator waypoints={props.waypoints}/> 
          </li>
        </ul>
    </div>
  )
}

export default LocationsViewMenu;