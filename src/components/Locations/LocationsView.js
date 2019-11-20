import React, {useState} from 'react';
import LocationsViewMenu from './LocationsViewMenu';
import LocationGridItem from './LocationGridItem';
import LocationListItem from './LocationListItem';

var LocationsView = (props) => {
  var renderList = () => {
    return props.list.map((location, index) => (
      <LocationListItem
        value={location}
        onSelected={props.onSelected}
        onRemoved={props.onRemoved}
        key={location.id}
        index={index} />
    ));
  }

  var renderGrid = () => {
    var output = props.list.map((location, index) => (
      <LocationGridItem 
        value={location} 
        onSelected={props.onSelected} 
        onRemoved={props.onRemoved} 
        key={location.id} 
        index={index} />
    ));

    return <div className="card-columns">{output}</div>
  }
  
  const [locationsView, setLocationsView] = useState('grid');

  return (
    <div className="locationList container">
      <div className="sticky-top">
        <LocationsViewMenu 
          waypoints={props.list} 
          onListSelected={()=>setLocationsView('list')} 
          onGridSelected={()=>setLocationsView('grid')} 
          onAlllocationsRemoved={props.onAlllocationsRemoved}/>      
      </div>
      {locationsView === 'grid' ? renderGrid() : renderList()}
    </div>
  )
}

export default LocationsView;