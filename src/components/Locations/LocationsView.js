import React, { useState } from 'react';
import LocationsViewMenu from './LocationsViewMenu';
import LocationGridItem from './LocationGridItem';
import LocationListItem from './LocationListItem';
import { useLocationsState, LocationsStateActions } from '../../State/LocationsState'
import { useModalState, ModalStateAction, ModalTypes } from '../../State/ModalStateProvider'

var LocationsView = () => {
  const [{locations}, dispatchlocations] = useLocationsState();
  const [{}, dispatchModal] = useModalState();

  var renderList = () => {
    var output = locations.map((location) => (
      <LocationListItem
        location={location}
        key={location.id}
        onRemove={()=>dispatchlocations({type: LocationsStateActions.removeLocation, data: location})}
        onEdit={()=>dispatchModal({type: ModalStateAction.show, data: location, modalType: ModalTypes.editLocation})} 
        onSelect={()=>dispatchlocations({type: LocationsStateActions.selectOnMap, data: location})}/>
    ));

    return <div className="locations-view-list-container">{output}</div>
  }

  var renderGrid = () => {
    var output = locations.map((location) => (
      <LocationGridItem 
        location={location} 
        key={location.id}
        onRemove={()=>dispatchlocations({type: LocationsStateActions.removeLocation, data: location})} 
        onEdit={()=>dispatchModal({type: ModalStateAction.show, data: location, modalType: ModalTypes.editLocation})} 
        onSelect={()=>dispatchlocations({type: LocationsStateActions.selectOnMap, data: location})}/>
    ));

    return <div className="locations-view-grid-container">{output}</div>
  }
  
  const [locationsView, setLocationsView] = useState('grid');

  return (
    <div className="locations-view-container">
      <div className="locations-view-menu">
        <LocationsViewMenu 
          onListSelected={()=>setLocationsView('list')} 
          onGridSelected={()=>setLocationsView('grid')} />      
      </div>
      {locationsView === 'grid' ? renderGrid() : renderList()}
    </div>
  )
}

export default LocationsView;