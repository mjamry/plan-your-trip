import React, {Component} from 'react';
import {Modal, Button, Popover, OverlayTrigger} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AddNewItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const popoverClickRootClose = (
      <Popover id="popover-trigger-click-root-close">
        <ul className="add-buttons-container">
          <li><FontAwesomeIcon icon="plus-circle" className="fa-3x add-button" title="Wikipedia"/></li>
          <li><FontAwesomeIcon icon="plus-circle" className="fa-3x add-button" title="Manual"/></li>
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

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddNewItem;