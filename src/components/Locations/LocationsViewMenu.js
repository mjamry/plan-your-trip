import React from 'react';
import GpxFileDownloader from '../../Common/GpxFileDownloader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocationsState, LocationsStateActions } from '../../State/LocationsState'
import { useModalState, ModalStateAction, ModalTypes } from '../../State/ModalStateProvider'

var LocationsViewMenu = (props) => {
  const [{locations}, dispatchLocations] = useLocationsState();
  const [{}, dispatchModal] = useModalState();

  return (
    <div className="locations-view-menu-container">
        <ul className="locations-view-menu">
          <li className="locations-view-menu-item" onClick={props.onListSelected}>
            <FontAwesomeIcon icon='th-list' className='fa-2x' title='show as list'/>
          </li>
          <li className="locations-view-menu-item" onClick={props.onGridSelected}>
            <FontAwesomeIcon icon='th-large' className='fa-2x' title='show as grid'/>
          </li>
          <li className="locations-view-menu-item">
            <FontAwesomeIcon 
              icon="trash-alt" 
              title="remove all locations" 
              className="location-delete fa-2x" 
              onClick={()=>dispatchLocations({type: LocationsStateActions.removeAllLocations})}/>
          </li>
          <li className="locations-view-menu-item">
            <FontAwesomeIcon 
              icon="file-download" 
              title="generate gpx file" 
              className="location-delete fa-2x" 
              onClick={()=>GpxFileDownloader.download(locations)}/>
          </li>
          <li className="locations-view-menu-item">
            <FontAwesomeIcon
              icon="search-plus"
              title="search"
              className="fa-2x"
              onClick={()=>dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.search})}/>
          </li>
        </ul>
    </div>
  )
}

export default LocationsViewMenu;