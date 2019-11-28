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
    return locations.map((location) => (
      <LocationListItem
        location={location}
        key={location.id}
        onRemove={()=>dispatchlocations({type: LocationsStateActions.removeLocation, data: location})}
        onEdit={()=>dispatchModal({type: ModalStateAction.show, data: location, modalType: ModalTypes.editLocation})} 
        onSelect={()=>dispatchlocations({type: LocationsStateActions.selectOnMap, data: location})}/>
    ));
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

    return <div className="card-columns">{output}</div>
  }
  
  const [locationsView, setLocationsView] = useState('grid');

  return (
    <div className="locationList container">
      <div className="sticky-top">
        <LocationsViewMenu 
          onListSelected={()=>setLocationsView('list')} 
          onGridSelected={()=>setLocationsView('grid')} />      
      </div>
      {locationsView === 'grid' ? renderGrid() : renderList()}
    </div>
  )
}

export default LocationsView;