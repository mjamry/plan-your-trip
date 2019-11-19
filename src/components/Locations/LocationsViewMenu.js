import React from 'react';
import FileGenerator from '../FileGenerator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var LocationsViewMenu = (props) => {
  return (
    <div className="ItemsListMenu">
        <ul className="nav justify-content-end">
          <li className="nav-items-list-menu-item" onClick={props.onListSelected}>
            <FontAwesomeIcon icon='th-list' className='fa-2x' title='show as list'/>
          </li>
          <li className="nav-items-list-menu-item" onClick={props.onGridSelected}>
            <FontAwesomeIcon icon='th-large' className='fa-2x' title='show as grid'/>
          </li>
          <li className="nav-items-list-menu-item">
            <FontAwesomeIcon icon="trash-alt" title="remove all items" className="item-delete fa-2x" onClick={props.onAllItemsRemoved}/>
          </li>
          <li className="nav-items-list-menu-item">
            <FileGenerator waypoints={props.waypoints}/> 
          </li>
        </ul>
    </div>
  )
}

export default LocationsViewMenu;