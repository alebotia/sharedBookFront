import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es';

import FormElement from './FormElement.jsx'
import AlertMessage from './AlertMessage.jsx'
import TermsAndConditionsModal from './TermsAndConditionsModal.jsx'

import '../assets/styles/LoginMain.css';
import '../assets/styles/LoginUtil.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css'; // hace que el checkbox quede seleccionado 
import 'react-datepicker/dist/react-datepicker.css'

import bgImage from '../images/login/bg-07.jpg';

import { saveUser, updateUser } from '../libs/ApiConnections'

registerLocale('es', es)

class AddUser extends Component{
	
constructor(props){
	super(props)
	const type = this.props.type;
	if (type === 'ADD' ){		
		this.state = {
			name: '',
			surname: '',
			email: '',
			password: '',
			phoneNumber: '',
			termsConditions: false,
			dobDate: new Date(2000, 1, 1),
			documentNumber:'',
			
			showMessage: false,
			isModalOpen: false,
		}
	}else {
		const { name, surname, phoneNumber, termsConditions, documentNumber, dobDate } = this.props;
		// console.log('date in constructor ', dobDate)
		let arrayOfDate = dobDate.split('/')
		this.state = {
			name: this.props.name,
			surname: this.props.surname,
			phoneNumber: this.props.phoneNumber,
			termsConditions: this.props.termsConditions,
			documentNumber: this.props.documentNumber,
			dobDate: new Date(arrayOfDate[2], arrayOfDate[1], arrayOfDate[0]),
			
			showMessage: false,
		}
	}
}

handleInputChange = (evt) =>{
    const target = evt.target;
    const name = target.name;
    let value;
    if(name === 'termsConditions'){
        value = !this.state.termsConditions
    }else{
    	value = target.type === 'chekbox' ? target.checked : target.value;
    }
    this.setState({
      [name]: value
    });
	}

onAddUser = async () =>{
	if(this.state.termsConditions){
	  	const data = {
	  		  name: this.state.name,
			  surname: this.state.surname,
			  email: this.state.email,
			  password: this.state.password,
			  phoneNumber: this.state.phoneNumber,
			  termsConditions: this.state.termsConditions,
			  dob: this.state.dobDate.toISOString(),
			  documentNumber: this.state.documentNumber
			}

		// console.log('handleSubmit on add user', data)
		let res = await saveUser(data)

		if (await res.responseCode !== 200){
			// console.log('error response adding user')
			this.setState({
				showMessage: true,
				alertType: 'error',
				mainMessage: res.response,
				alternativeMessage: ''
		})	

		}else{
			this.setState({
				name: '',
				surname: '',
				email: '',
				password: '',
				phoneNumber: '',			
				dobDate: new Date(2000, 1, 1),
				documentNumber: '',
				termsConditions: false,

				showMessage: true,
				alertType: 'success',
				mainMessage: res.response,
				alternativeMessage: 'Puedes adicionar otro usuario en caso de ser necesario'
			})	  	
		}
	}else{
		this.setState({
			showMessage: true,
			alertType: 'error',
			mainMessage: 'Debe Aceptar los terminos y condiciones del servicio.'
		})
	}
 }

onUpdateUser = async () =>{
  	const data = {
  	  _id: this.props.userId,
	  name: this.state.name,
	  surname: this.state.surname,
	  phoneNumber: this.state.phoneNumber,
	  dob: this.state.dobDate.toISOString()
	}

	// console.log('handleSubmit on add user', data)
	let res = await updateUser(data)

	if (await res.responseCode !== 200){
		// console.log('error response adding user')
		this.setState({
		showMessage: true,
		alertType: 'error',
		mainMessage: res.response,
		alternativeMessage: ''
	})	

	}else{
		this.setState({
			showMessage: true,
			alertType: 'success',
			mainMessage: res.response,
			alternativeMessage: 'Puedes adicionar otro usuario en caso de ser necesario'
		})	  	
	}
}

handleSubmit = async (evt) => {
  evt.preventDefault()
  if (this.props.type === 'ADD'){
  	this.onAddUser()
  }else {
  	this.onUpdateUser()
  }
}

dateChange = date =>{
	this.setState({ dobDate: date })
}

openTyC = (evt) => {
	evt.preventDefault()
	this.setState({ isModalOpen: true })
}

onModalClose = () =>{
	this.setState({ isModalOpen: false })
}

render(){
	const { type } = this.props;

	const { name, surname, email, password, phoneNumber, termsConditions, dobDate, documentNumber } = this.state;
	// console.log('tyc ', termsConditions)
	const { showMessage, alertType, mainMessage, alternativeMessage } = this.state;
	return (
		<>		
		<div className="align-middle px-12 mx-auto">
			<div className="login100-form-title" style={{"backgroundImage": `url(${bgImage})`}}>
				<span className="login100-form-title-1">
					{type === 'ADD' ? 'Agregar Usuario' : 'Actualizar Usuario'}
				</span>
			</div>
			<form className="login100-form validate-form" onSubmit={this.handleSubmit}>

				<FormElement inputName= "name"
							 inputType= "text"
							 inputValue= {name}
				 			 label = "Nombre"
							 onChangeFunc= { this.handleInputChange } />

				<FormElement inputName= "surname"
							 inputType= "text"
							 inputValue= {surname}
				 			 label = "Apellidos"
							 onChangeFunc= { this.handleInputChange } />

				<div className="wrap-input100 validate-input m-b-18" data-validate = "Contraseña es requerida">
					<span className="label-input100" >Fecha de nacimiento:</span>
					<DatePicker 
		        		selected= { dobDate } 
		        		minDate= { new Date(1950, 1, 1) }
  						onChange= { this.dateChange }
  						showDisabledMonthNavigation
  						dateFormat="dd/MM/yyyy"
  						locale="es" 
  						className="react-datepicker text-center "
  						style = {{ "height": "40px" }}/>
  					
					</div>

				{ type === 'ADD' && <FormElement inputName= "documentNumber"
							 		inputType= "number"
							 		inputValue= {documentNumber}
				 			 		label = "documento"
							 		onChangeFunc= { this.handleInputChange } />
							 }

				<FormElement inputName= "phoneNumber"
							 inputType= "number"
							 inputValue= {phoneNumber}
				 			 label = "Telefono"
							 onChangeFunc= { this.handleInputChange } />

				{ type === 'ADD' && <FormElement inputName= "email"
							 		inputType= "email"
							 		inputValue= {email}
				 			 		label = "Email"
							 		onChangeFunc= { this.handleInputChange } />
							 	}

				{ type === 'ADD' && <FormElement inputName= "password"
							 		inputType= "password"
							 		inputValue= {password}
				 			 		label = "Contraseña"
							 		onChangeFunc= { this.handleInputChange } />
								}

				{ type === 'ADD' &&	<div className="flex-sb-m w-full p-b-30">
										<div className="contact100-form-checkbox">
											<input className="input-checkbox100" 
												   type="checkbox"
												   onChange= { this.handleInputChange } 
												   checked= { termsConditions } 
												   name= 'termsConditions'
												   id="tyc"/>
											<label className="label-checkbox100" htmlFor="tyc">
												Acepto los <a href='#' onClick={ this.openTyC }> terminos y condiciones </a> del servicio.
											</label>
										</div>
									</div>
								}
			
				<div className="container-login100-form-btn">
					<button className="login100-form-btn">
						{type === 'ADD' ? 'Agregar Usuario' : 'Actualizar Usuario'}
					</button>
					{ this.props.comeBackFunction != undefined &&
						<button className="login100-form-btn ml-4 btn-secondary" onClick= { this.props.comeBackFunction }>
							Regresar
						</button>
					}
				</div>
				{this.state.showMessage && <AlertMessage 
								  			alertType= { alertType }
								  			mainMessage= { mainMessage } 
								  			alternativeMessage= { alternativeMessage } />
				}	
			</form>		
		</div>

		<TermsAndConditionsModal onModalClose= { this.onModalClose }
            			 isModalOpen= { this.state.isModalOpen } />
	</>)

}

}

AddUser.propTypes = {
	type: PropTypes.oneOf(['ADD', 'UPDATE']).isRequired,
	userId: PropTypes.string,
	name: PropTypes.string,
	surname: PropTypes.string,
	phoneNumber: PropTypes.string,
	dobDate: PropTypes.string,
	comeBackFunction: PropTypes.func
}

export default AddUser;