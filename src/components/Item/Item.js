import React, {Component} from 'react';

class Item extends Component {
  render(){
    return (
      <div className="Item row">
        <div className="col-1"><img className="item-image" src={this.props.value.image} alt=''></img></div>
        <div className="item-name col-3" title={this.props.value.link}><a href={this.props.value.link} target="_blank" rel="noopener noreferrer">{this.props.value.name}</a></div>
        <div className="item-description col-6" title={this.props.value.description}>{this.props.value.description}</div>
        <div className="item-attractiveness col-2">{this.props.value.attractivness}</div>
      </div>
    )
  }
}

export default Item;