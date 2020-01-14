import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

var SearchResult = (props) => {

  var renderResults = () => { 
    let output = [];

    for(let index in props.results){
      output.push(
        <div className="search-result-item" key={index}>
          <FontAwesomeIcon icon={['fab', 'wikipedia-w']} className="fab search-result-icon"/>
          <div 
            onClick={()=>props.onSelected(props.results[index])}>
            {props.results[index]}
          </div>
        </div>)
    }

    return output;
  }

  var renderError = () => {
    return <div className="search-result-error">No resutls</div>
  }

  return (
    <div className="search-result-container">
        {props.results && props.results.length === 0 ? renderError() : renderResults()}
    </div>
  )
}

export default SearchResult;