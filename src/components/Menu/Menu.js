import React, {Component} from 'react';
import MenuItem from '../MenuItem/MenuItem'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

class Menu extends Component {
  render(){
    return (
      <div className="Menu nav-flex-column">
        <MenuItem name="Menu1" ref="#" icon="user-circle" posiotion="top"/>
        <MenuItem name="Menu3" ref="#" icon="wrench" position="bottom"/>
        <MenuItem name="Menu4" ref="#" icon="question-circle" position="bottom"/>
      </div>
    )
  }
}

export default Menu;