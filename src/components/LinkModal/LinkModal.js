import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap'

class LinkModal extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
    
    this.state = {
      linkValue: ""
    }

  }

  onChange(e){
    this.setState({linkValue: e.target.value});
  }

  onClose(){
    this.props.onClose(this.state.linkValue);
  }

  render(){
    return (
      <div className="LinkModal">
        <Modal show={this.props.visible} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
          <label for="exampleInputEmail1">Wiki link:</label>
            <input 
              type="link" 
              class="form-control" 
              placeholder="Paste link to the wikipedia"
              onChange={this.onChange}/>    
          </form>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onClose}>Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
LinkModal.propTypes = {
}

export default LinkModal;