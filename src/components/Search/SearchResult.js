import React from 'react';

var SearchResult = (props) => {

  var renderResults = () => {  
    let output = [];
    for(let index in props.results){
      output.push(
      <div 
        className="dropdown-item search-result" 
        data-toggle="modal" data-target="#itemDetailsFormModal"
        onClick={()=>props.onSelected(props.results[index])}
        key={index}>
        {props.results[index]}
      </div>)
    }

    return output;
  }

  return (
    <div className="SearchResult">
      <div className={props.isOpened + " dropdown"}>
        <div className={props.isOpened + " dropdown-menu"} aria-labelledby="dropdownMenuButton">
          {renderResults()}
        </div>
      </div>
    </div>
  )
}

export default SearchResult;