import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// placeholder="Busca y valida si se le puede prestar un libro a una persona."
// placeholder = 'nombre + apellido'
// dependiendo el resultado se habilita el boton prestar libro
export default function SearchBoxUser ( { enterPressed, handleInputChange, handleClic, userDocument } ){
	return (
	  <div className="my-2">
	  <div className="input-group">
	  		<label style={{ "marginRight": "5%" }}> Usuario </label>
	        <input className="form-control py-2" id="example-search-input"
	               name="userDocument"
	               type="number"
	               value={ userDocument }
	               onChange= { handleInputChange }
	               onKeyPress={ enterPressed }
	               />
	        <span className="input-group-append">
	          <button className="btn btn-outline-secondary" type="button" onClick={ handleClic }>                          
	              <FontAwesomeIcon className="fa" icon={faSearch} /> 
	          </button>
	        </span>
	        <br />
	  </div>
	        <small style={{ "marginLeft": "18%" }} className="form-text text-muted">Validar el usuario al que se va a hacer el prestamo .</small>
	  </div>
	)
}


SearchBoxUser.propTypes = {
	enterPressed: PropTypes.func.isRequired, 
    handleClic: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    inputName: PropTypes.string,
    userDocument: PropTypes.string

}