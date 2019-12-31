import React, { useState, useEffect } from 'react';
import WikipediaAPIWrapper from '../../Common/WikipediaAPIWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchResult from './SearchResult';
import { ModalStateAction, useModalState, ModalTypes } from '../../State/ModalStateProvider'
 
const SearchTimeout = 700;

var Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [timer, setTimer] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const [{}, dispatchModal] = useModalState();

  var setupTimer = () => {
    clearTimeout(timer);
    setTimer(setTimeout(handleSearchInputTimeout, SearchTimeout));
  }

  var handleSearchInputTimeout = () => { 
    WikipediaAPIWrapper.search(searchValue).then(results => setSearchResults(results));
  }

  var handleSelection = (selection) => {
    setSearchResults(null);
    setSearchValue("");
 
    WikipediaAPIWrapper.getDetails(selection).then(location => {
      dispatchModal({type: ModalStateAction.show, data: location, modalType: ModalTypes.addLocation});
    });
  }

  useEffect(()=>{
    if(searchValue !== "")
    {
      setupTimer();
    }
  }, [searchValue])

  return (
    <div className="Search container">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text"><FontAwesomeIcon icon="search-location" className="fa-2x"/></span>
        </div>
      <input type="text" className="form-control" placeholder="enter name" onChange={e => setSearchValue(e.target.value)} value={searchValue} autoFocus/>
      </div>
    <SearchResult results={searchResults} onSelected={handleSelection}/>
    </div>
  )
}

export default Search;