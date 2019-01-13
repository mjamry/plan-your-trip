import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class MenuItem extends Component {
  render(){
    return (
      <div className="MenuItem nav-item" title={this.props.title}>
        <a href={this.props.link}><FontAwesomeIcon icon={this.props.icon} className="fa-2x"/></a> 
      </div>
    )
  }
}

export default MenuItem;