import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/LoginMain.css';
import '../assets/styles/LoginUtil.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

import AddUser from '../components/AddUser.jsx'

import FormElement from '../components/FormElement.jsx'

import bgImage from '../images/login/bg-09.jpg';

class Login extends Component  {


// El componente puede estar en dos estados 
// LOGIN
// ADD_USER
	constructor(props){
		super(props)
		this.state = ({
			email: null,
			password: null,

			currentComponent: "LOGIN" 
		})
	}

	handleInputChange = (evt) =>{
	    const target = evt.target;
	    const value = target.type === 'chekbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
  	}


	handleSubmit = (e) => {
	  e.preventDefault()
	  const { onLoginTry = f => f } = this.props;

	  const email = this.state.email
	  const password = this.state.password

	  onLoginTry({ email, password })
	  // console.log(this.state)
	}

	onNewUser = (e) => {
		// console.log('new user')
		this.setState({
			currentComponent: "ADD_USER"
		})
	}

	// Login es la pagina para que el usuario se autentique
	// Adicionar usuario es para add_user

	comeBackFunction = async () =>{
		if (this.state.currentComponent === 'LOGIN'){			
			this.setState({
				currentComponent: 'ADD_USER'				
			})
		}else {
			this.setState({
				currentComponent: 'LOGIN'
			})
		}
	}

	render(){
		const { loginError, loginCode } = this.props;
		const { currentComponent } = this.state;
		return (
			currentComponent === 'LOGIN' ?	
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100">
						<div className="login100-form-title" style={{"backgroundImage": `url(${bgImage})`}}>
							<span className="login100-form-title-1">
								Shared Books
							</span>
						</div>
						<form className="login100-form validate-form" onSubmit={this.handleSubmit}>

							<FormElement inputName= "email"
										 inputType= "email"
										 inputValue= {this.email}
							 			 label = "Email"
										 onChangeFunc= { this.handleInputChange } />

							<FormElement inputName= "password"
										 inputType= "password"
										 inputValue= {this.password}
							 			 label = "Contraseña"
										 onChangeFunc= { this.handleInputChange } />

							<div className="container-login100-form-btn m-b-18">
								<button className="login100-form-btn">
									Ingresar
								</button>
							</div>
							<div className="container-login100-form-btn">
								<button className="login100-form-btn btn-info" onClick={ this.onNewUser }>
									Crear cuenta    
									<FontAwesomeIcon icon={ faAngleDoubleRight } />
								</button>
							</div>
								{ loginError && 
									<div className="alert alert-danger mt-3" role="alert">
							  		{ loginCode === 404 ? 'Usuario o Contraseña incorrectos !! intentelo nuevamente.'
							  					  : 'Se produjo un error interno en el servidor, intentelo nuevamente.' }
									</div>
								}	
						</form>			
					</div>
				</div>
			</div>
			: <AddUser type= "ADD"
			   comeBackFunction = { this.comeBackFunction } />
	)}

}

Login.propTypes = {
  onLoginTry: PropTypes.func.isRequired,
  loginError: PropTypes.bool.isRequired,
  loginCode: PropTypes.number
};

export default Login;