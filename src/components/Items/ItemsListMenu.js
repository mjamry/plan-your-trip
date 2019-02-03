import React, {Component} from 'react';
import FileGenerator from '../FileGenerator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ItemsListMenu extends Component {
    render(){
    return (
      <div className="ItemsListMenu">
          <ul class="nav justify-content-end">
            <li class="nav-items-list-menu-item" onClick={this.props.onListSelected}>
              <FontAwesomeIcon icon='th-list' className='fa-2x' title='show as list'/>
            </li>
            <li class="nav-items-list-menu-item" onClick={this.props.onGridSelected}>
              <FontAwesomeIcon icon='th-large' className='fa-2x' title='show as grid'/>
            </li>
            <li class="nav-items-list-menu-item">
              <FontAwesomeIcon icon="trash-alt" title="remove all items" className="item-delete fa-2x" onClick={this.removeAllItems}/>
            </li>
            <li class="nav-items-list-menu-item">
              <FileGenerator waypoints={this.props.waypoints}/> 
            </li>
          </ul>
      </div>
    )
  }
}
export default ItemsListMenu;