import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// placeholder="Busca libros por nombre, autor o genero literario."
class SearchBox extends Component{

	constructor(props){
		super(props);
		this.state = { searchText: '' }
	}

	handleInputChange = (event) =>{
	    const target = event.target;
	    const value = target.type === 'chekbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
  	}
  	
	handleClic = evt =>{
		const { onSearchChanged = f => f } = this.props;

	    const currentPage = 1;
	    // the second parameter is a callbackfunction used when the state has change
	    const word = this.state.searchText;
	    const eventType = 'TEXTBOX'
	    const data = {currentPage, word, eventType}
	    
	    // this.setState({ searchText: word }, () => onSearchChanged(data));
	    onSearchChanged(data);
	}

	enterPressed = evt => {
	    var code = evt.keyCode || evt.which;
	    if(code === 13) { //13 is the enter keycode
        	const { onSearchChanged = f => f } = this.props;

		    const currentPage = 1;
		    // the second parameter is a callbackfunction used when the state has change
		    const word = this.state.searchText;
		    const eventType = 'TEXTBOX'
		    const data = {currentPage, word, eventType}
		    
		    // this.setState({ searchText: word }, () => onSearchChanged(data));
		    onSearchChanged(data);
	    } 
	}
	
	render(){
		return (
		  <div className="input-group col-md-4">
		        <input className="form-control py-2" id="example-search-input"
		               name="searchText"
		               type="search"
		               value={this.state.searchText}
		               onChange= {this.handleInputChange}
		               onKeyPress={this.enterPressed}  />
		        <span className="input-group-append">
		          <button className="btn btn-outline-secondary" type="button" onClick={this.handleClic}>                          
		              <FontAwesomeIcon className="fa" icon={faSearch} /> 
		          </button>
		        </span>
		        <small id="emailHelp" className="form-text text-muted">Busca libros por nombre, autor o genero literario.</small>
		  </div>
		)
	}
}

SearchBox.propTypes = {
    onSearchChanged :  PropTypes.func.isRequired
}

export default SearchBox;