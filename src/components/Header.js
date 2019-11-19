import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from './Search/Search'

var Header = (props) => {
  return (
    <div className="Header">
      <nav class="navbar">
          <div><FontAwesomeIcon icon='globe-americas'/> Plan the Trip</div>
          <div>
            <Search onFinished={props.onSearchFinished}/>
          </div>
      </nav>
    </div>
  )
}

export default Header;