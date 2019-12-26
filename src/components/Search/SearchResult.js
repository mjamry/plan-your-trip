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

  return (
    <div className="search-result-container">
        {renderResults()}
    </div>
  )
}

export default SearchResult;