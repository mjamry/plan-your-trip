import React, {Component} from 'react';
import WikipediaAPIWrapper from '../../WikipediaAPIWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchTimeout = 700;

class Search extends Component {
  constructor(props){
    super(props);

    this.onChange = this.onChange.bind(this);
    this.setupTimer = this.setupTimer.bind(this);
    this.handleSearchInputTimeout = this.handleSearchInputTimeout.bind(this);

    this.state = {
      searchValue: "",
      timer: null
    }
  }

  onChange(e){
    this.setState({searchValue: e.target.value});
    this.setupTimer();
  }

  setupTimer(){
    clearTimeout(this.state.timer);
    this.setState({timer: setTimeout(this.handleSearchInputTimeout, SearchTimeout)})
  }

  handleSearchInputTimeout(){
    console.log(this.state.searchValue);
    WikipediaAPIWrapper.getDetails(this.state.searchValue).then(console.log)
  }

  render(){
    return (
      <div className="Search">
        <div class="input-group mb-3 container">
          <div class="input-group-prepend">
           <span class="input-group-text"><FontAwesomeIcon icon="search-location" className="fa-2x"/></span>
        </div>
        <input type="text" class="form-control" placeholder="Search location" onChange={this.onChange}/>
      </div>
      </div>
    )
  }
}

export default Search;