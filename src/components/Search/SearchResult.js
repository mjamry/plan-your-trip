import React from 'react';

var SearchResult = (props) => {

  var renderResults = () => { 
    let output = [];

    for(let index in props.results){
      output.push(
      <div 
        className="search-result-item"
        onClick={()=>props.onSelected(props.results[index])}
        key={index}>
        {props.results[index]}
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