import React, {useState} from 'react';
import ListItem from './ListItem'
import ItemsListMenu from './ItemsListMenu';
import GridItem from './GridItem';

var ItemsList = (props) => {
  
  var renderList = () => {
    return props.list.map((item, index) => (
      <ListItem 
        value={item} 
        onSelected={props.onSelected} 
        onRemoved={props.onRemoved} 
        key={item.name + index} 
        index={index}></ListItem>
    ));
  }

  var renderGrid = () => {
    var output = props.list.map((item, index) => (
      <GridItem 
        value={item} 
        onSelected={props.onSelected} 
        onRemoved={props.onRemoved} 
        key={item.name + index} 
        index={index}></GridItem>
    ));

    return <div className="card-columns">{output}</div>
  }
  
  const [locationsView, setLocationsView] = useState('grid');

  return (
    <div className="ItemList container">
      <div className="sticky-top">
        <ItemsListMenu 
          waypoints={props.list} 
          onListSelected={()=>setLocationsView('list')} 
          onGridSelected={()=>setLocationsView('grid')} 
          onAllItemsRemoved={props.onAllItemsRemoved}/>      
      </div>
      {locationsView === 'grid' ? renderGrid() : renderList()}
    </div>
  )
}

export default ItemsList;