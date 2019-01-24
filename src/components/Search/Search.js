import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Search extends Component {
  render(){
    return (
      <div className="Search">
        <div class="input-group mb-3 container">
          <div class="input-group-prepend">
           <span class="input-group-text"><FontAwesomeIcon icon="search-location" className="fa-2x"/></span>
        </div>
        <input type="text" class="form-control" placeholder="Username"/>
      </div>
      </div>
    )
  }
}

export default Search;