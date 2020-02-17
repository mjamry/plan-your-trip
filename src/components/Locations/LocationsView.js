import React, { useState, useEffect } from 'react';
import LocationsViewMenu from './LocationsViewMenu';
import LocationGridItem from './LocationGridItem';
import LocationListItem from './LocationListItem';
import { useLocationsState, LocationsStateActions } from '../../State/LocationsState'
import { useModalState, ModalStateAction, ModalTypes } from '../../State/ModalStateProvider'

import {useListsState, ListViewType } from '../../State/LocationsListsState'

var LocationsView = () => {
  const [{locations}, dispatchlocations] = useLocationsState();
  const [{}, dispatchModal] = useModalState();
  const [{view}, dispatchList] = useListsState();

  var renderList = () => {
    var output = locations.map((location) => (
      <LocationListItem
        location={location}
        key={location.id}
        onRemove={()=>dispatchModal({type: ModalStateAction.show, data: location, modalType: ModalTypes.removeLocation})}
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
        onRemove={()=>dispatchModal({type: ModalStateAction.show, data: location, modalType: ModalTypes.removeLocation})} 
        onEdit={()=>dispatchModal({type: ModalStateAction.show, data: location, modalType: ModalTypes.editLocation})} 
        onSelect={()=>dispatchlocations({type: LocationsStateActions.selectOnMap, data: location})}/>
    ));

    return <div className="locations-view-grid-container">{output}</div>
  }

  return (
    <div className="locations-view-container">
      {view === ListViewType.grid ? renderGrid() : renderList()}
    </div>
  )
}

export default LocationsView;