import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var Header = (props) => {
  return (
    <div className="Header">
      <nav className="navbar">
          <div><FontAwesomeIcon icon='globe-americas'/> Plan the Trip</div>
      </nav>
    </div>
  )
}

export default Header;