import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from './Search/Search'

class Header extends Component {
  render(){
    return (
      <div className="Header">
        <nav class="navbar">
            <div><FontAwesomeIcon icon='globe-americas'/> Plan the Trip</div>
            <div>
              <Search onFinished={this.props.onSearchFinished}/>
            </div>
        </nav>
      </div>
    )
  }
}

export default Header;