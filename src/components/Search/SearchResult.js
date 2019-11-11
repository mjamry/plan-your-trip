import React, {Component} from 'react';

class SearchResult extends Component {

  renderResults(){  
    let output = [];
    for(let index in this.props.results){
      output.push(
      <div 
        className="dropdown-item search-result" 
        data-toggle="modal" data-target="#itemDetailsFormModal"
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
        <div className={this.props.isOpened + " dropdown"}>
          <div className={this.props.isOpened + " dropdown-menu"} aria-labelledby="dropdownMenuButton">
            {this.renderResults()}
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResult;