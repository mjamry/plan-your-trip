import React, {Component} from 'react';
import WikipediaAPIWrapper from '../../WikipediaAPIWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchResult from '../SearchResult/SearchResult';

const SearchTimeout = 700;

class Search extends Component {
  apiWrapper = WikipediaAPIWrapper;

  constructor(props){
    super(props);

    this.onChange = this.onChange.bind(this);
    this.setupTimer = this.setupTimer.bind(this);
    this.handleSearchInputTimeout = this.handleSearchInputTimeout.bind(this);
    this.handleSelection = this.handleSelection.bind(this);

    this.state = {
      searchValue: "",
      timer: null,
      searchResults: []
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
    this.apiWrapper.search(this.state.searchValue).then(results => {this.setState({searchResults: results})})
  }

  handleSelection(selection){
    this.setState({
      searchResults: [],
      searchValue: ''
    })
    this.apiWrapper.getDetails(selection).then(item => this.props.onFinished(item))
  }

  render(){
    return (
      <div className="Search container">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
           <span className="input-group-text"><FontAwesomeIcon icon="search-location" className="fa-2x"/></span>
          </div>
        <input type="text" className="form-control" placeholder="Search location" onChange={this.onChange} value={this.state.searchValue}/>
        </div>
      <SearchResult results={this.state.searchResults} onSelected={this.handleSelection} isOpened={this.state.searchResults.length > 0 ? 'show' : ''}/>
      </div>
    )
  }
}

export default Search;