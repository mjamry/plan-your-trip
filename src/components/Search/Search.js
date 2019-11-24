import React, {useState, useEffect} from 'react';
import WikipediaAPIWrapper from '../../Common/WikipediaAPIWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchResult from './SearchResult';
import LocationDetailsForm from '../Locations/LocationDetailsForm'
import {LocationsStatusActions, useLocationsState} from '../../State/LocationsState'
 
const SearchTimeout = 700;

var Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [timer, setTimer] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedlocation, setSelectedlocation] = useState(null);

  const [{}, dispatch] = useLocationsState();

  var setupTimer = () => {
    clearTimeout(timer);
    setTimer(setTimeout(handleSearchInputTimeout, SearchTimeout));
  }

  var handleSearchInputTimeout = () => { 
    WikipediaAPIWrapper.search(searchValue).then(results => setSearchResults(results));
  }

  var handleSelection = (selection) => {
    setSearchResults([]);
    setSearchValue("");
 
    WikipediaAPIWrapper.getDetails(selection).then(location => setSelectedlocation(location));
  }

  var handleNewlocationEditFinished = (location) => {
    setSelectedlocation(null);
    props.onFinished(location);
    dispatch({type: LocationsStatusActions.addLocation, data: location})
  }

  useEffect(()=>{
    setupTimer();
  }, [searchValue])

  return (
    <div className="Search container">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text"><FontAwesomeIcon icon="search-location" className="fa-2x"/></span>
        </div>
      <input type="text" className="form-control" placeholder="Search location" onChange={e => setSearchValue(e.target.value)} value={searchValue}/>
      </div>
    <SearchResult results={searchResults} onSelected={handleSelection} isOpened={searchResults.length > 0 ? 'show' : ''}/>
    <LocationDetailsForm location={selectedlocation} onFinished={handleNewlocationEditFinished}/>
    </div>
  )
}

export default Search;