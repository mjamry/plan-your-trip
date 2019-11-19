import React, {useState} from 'react';
import LocationsViewMenu from './LocationsViewMenu';
import LocationGridItem from './LocationGridItem';
import LocationListItem from './LocationListItem';

var LocationsView = (props) => {
  var renderList = () => {
    return props.list.map((item, index) => (
      <LocationListItem
        value={item}
        onSelected={props.onSelected}
        onRemoved={props.onRemoved}
        key={item.name + index}
        index={index} />
    ));
  }

  var renderGrid = () => {
    var output = props.list.map((item, index) => (
      <LocationGridItem 
        value={item} 
        onSelected={props.onSelected} 
        onRemoved={props.onRemoved} 
        key={item.name + index} 
        index={index} />
    ));

    return <div className="card-columns">{output}</div>
  }
  
  const [locationsView, setLocationsView] = useState('grid');

  return (
    <div className="ItemList container">
      <div className="sticky-top">
        <LocationsViewMenu 
          waypoints={props.list} 
          onListSelected={()=>setLocationsView('list')} 
          onGridSelected={()=>setLocationsView('grid')} 
          onAllItemsRemoved={props.onAllItemsRemoved}/>      
      </div>
      {locationsView === 'grid' ? renderGrid() : renderList()}
    </div>
  )
}

export default LocationsView;