import React, {Component} from 'react';

class SearchResult extends Component {
  renderResults(){
    let output = [];
    for(let index in this.props.results){
      output.push(
      <div 
        className="dropdown-item" 
        onClick={()=>this.handleSelection(this.props.results[index])}>
        {this.props.results[index]}
      </div>)
    }

    return output;
  }

  handleSelection(selection){
    this.props.onSelected(selection)
  }

  render(){
    return (
      <div className="SearchResult">
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown button
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.renderResults()}
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResult;