import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

var SearchResult = (props) => {

  var renderResults = () => { 
    let output = [];

    for(let index in props.results){
      output.push(
        <ListItem 
          button
          key={index}
          onClick={()=>props.onSelected(props.results[index])}>
          <ListItemIcon>
            <FontAwesomeIcon icon={['fab', 'wikipedia-w']} className="fab search-result-icon"/>
          </ListItemIcon>
          <ListItemText primary={props.results[index]} />
        </ListItem>
      )
    }

    return output;
  }

  var renderError = () => {
    return <div className="search-result-error">No resutls</div>
  }

  return (
    <List component="nav">
        {props.results && props.results.length === 0 ? renderError() : renderResults()}
    </List>
  )
}

export default SearchResult;