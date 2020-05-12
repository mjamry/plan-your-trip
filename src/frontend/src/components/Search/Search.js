import React, { useState, useEffect } from 'react';
import WikipediaAPIWrapper from '../../Common/WikipediaAPIWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchResult from './SearchResult';
import { ModalStateAction, useModalState, ModalTypes } from '../../State/ModalStateProvider'
import useLoggerService from '../../Services/Diagnostics/LoggerService'
 
const SearchTimeout = 700;

var Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [timer, setTimer] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{}, dispatchModal] = useModalState();
  const logger = useLoggerService();

  var setupTimer = () => {
    clearTimeout(timer);
    setTimer(setTimeout(handleSearchInputTimeout, SearchTimeout));
  }

  var handleSearchInputTimeout = () => { 
    setIsLoading(true);
    WikipediaAPIWrapper.search(searchValue).then(results => 
      {
        setSearchResults(results)
        setIsLoading(false);
      });
  }

  var handleSelection = (selection) => {
    setSearchResults(null);
    setSearchValue("");
    
    dispatchModal({type: ModalStateAction.show, modalType: ModalTypes.loading});

    WikipediaAPIWrapper
      .getDetails(selection)
      .then(location => {
            dispatchModal({type: ModalStateAction.show, data: location, modalType: ModalTypes.addLocation})
            logger.debug(`[Search] Received data for ${selection}`, location)
          })
      .catch((error) => {
            logger.error(`[Search] Error while fetching data: ${selection}`, error);
      
    });
  }

  useEffect(()=>{
    if(searchValue !== "")
    {
      setupTimer();
      setIsLoading(false);
    }
  }, [searchValue])

  return (
    <div className="Search container">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text"><FontAwesomeIcon icon="search-location" className="fa-2x"/></span>
        </div>
      <input type="text" className="form-control" placeholder="enter name" onChange={e => setSearchValue(e.target.value)} value={searchValue} autoFocus/>
        <div className="search-loading-indicator" style={{display: isLoading ? "block" : "none"}}>
          <div className="search-loading-indicator-icon">
            <FontAwesomeIcon icon="spinner" spin className="fa-2x"/> 
          </div>
        </div>
      </div>
    <SearchResult results={searchResults} onSelected={handleSelection}/>
    </div>
  )
}

export default Search;