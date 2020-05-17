import React from 'react'
import PropTypes from 'prop-types'

import '../assets/styles/LoginMain.css';
import '../assets/styles/LoginUtil.css';

export default function FormElement({ helper, inputName, inputType, inputValue, label, onChangeFunc }){
	return(
	<div className="wrap-input100 validate-input m-b-18" data-validate = "Contraseña es requerida">
		<span className="label-input100" >{ `${ label }:` } </span> 
		<input className="input100"
			   type= { inputType }
			   name= { inputName }
			   value={ inputValue }
			   onChange= { onChangeFunc }
			   placeholder= { label } />
		<span className="focus-input100"></span> 
		<small className="form-text text-muted"> { helper } </small> 
	</div>
	)
}

FormElement.propTypes = {
	helper:  PropTypes.string,
	inputName: PropTypes.string.isRequired,
	inputType: PropTypes.oneOf(['password','checkbox', 'text', 'number', 'email']).isRequired,
	inputValue: PropTypes.string,
	label: PropTypes.string.isRequired,
	onChangeFunc: PropTypes.func.isRequired
}