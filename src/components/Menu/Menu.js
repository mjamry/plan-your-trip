import React, {Component} from 'react';
import MenuItem from './MenuItem'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

class Menu extends Component {
  render(){
    return (
      <div className="Menu nav-flex-column">
        <MenuItem title="User" ref="#" icon="user-circle" posiotion="top"/>
        <MenuItem title="Settings" ref="#" icon="cog" position="bottom"/>
        <MenuItem title="About" ref="#" icon="question-circle" position="bottom"/>
      </div>
    )
  }
}

export default Menu;