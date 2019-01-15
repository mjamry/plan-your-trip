import React, {Component} from 'react';
import LinkModal from '../LinkModal/LinkModal'
import {Popover, OverlayTrigger} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AddNewItem extends Component {
  constructor(props){
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.onModalClosed = this.onModalClosed.bind(this);
    this.state = {
      isWikiModalVisible: false
    }
  }

  handleShow(){
    this.setState({isWikiModalVisible: true})
  }

  onModalClosed(value){
    console.log(value);
    this.setState({isWikiModalVisible: false})
  }

  render() {
    const popoverClickRootClose = (
      <Popover id="popover-trigger-click-root-close" >
        <ul className="add-buttons-container">
          <li><FontAwesomeIcon icon="plus-circle" onClick={this.handleShow} className="fa-3x add-button" title="Wikipedia"/></li>
        </ul>
      </Popover>
    );
    return (
      <div>
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="top"
          overlay={popoverClickRootClose}
        >
          <FontAwesomeIcon icon="plus-circle" className="fa-4x add-new-item-btn" title="add new item"/>
        </OverlayTrigger>
        <LinkModal visible={this.state.isWikiModalVisible} onClose={this.onModalClosed}/>
      </div>
    );
  }
}

export default AddNewItem;