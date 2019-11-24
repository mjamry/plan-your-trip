import React, { useState } from 'react';
import LocationsViewMenu from './LocationsViewMenu';
import LocationGridItem from './LocationGridItem';
import LocationListItem from './LocationListItem';
import { useLocationsState } from "../../State/LocationsState"

var LocationsView = () => {
  const [{locations}] = useLocationsState();

  var renderList = () => {
    return locations.map((location) => (
      <LocationListItem
        location={location}
        key={location.id} />
    ));
  }

  var renderGrid = () => {
    var output = locations.map((location) => (
      <LocationGridItem 
        location={location} 
        key={location.id}/>
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