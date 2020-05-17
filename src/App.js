import React, {Component} from 'react';
import Home from './pages/Home.jsx'
import Login from './pages/Login'

import { getCurrentRole } from './libs/Helpers.js';
import { getItem } from './libs/LocalStorage'

import { login, isTokenValid } from './libs/ApiConnections';
import { dropItem } from './libs/LocalStorage'

class App extends Component  {
//  la idea es que los datos vayan en una sola direccion 
//  se pasa una funcion para que al hacer uso se manejen 
//  las peticiones desde un solo lado
//  lo mismo pasa con el componente Home -> SearchBox
//  teniendo en cuenta este acercamiento se debe 
//  hacer bajar una funcion onLogoutTry que vaya hasta el componente que va a disparar

//  este problema puede ser resuelto por redux

//  recibe objeto con usuario y contraseña
//  enviarlo a la api y validar el intento de ingreso 

  constructor(){
    super();
    this.state = { isLogged: false, loginError: false }
  }


// cada vez que se inicia la app se valida si el token existente es valido 
// si no se pide que inicie sesion nuevamente

// SOLO HAY DOS ROLES DE USUARIO
// ROLE_ADMIN
// ROLE_USER

async componentDidMount(){
	const tokenValid = await isTokenValid()
	if (tokenValid){
    const currentRole = getItem('userRole')
		this.setState({ isLogged: true, userRole: currentRole})
    // this.setState({ isLogged: true })
	}
	else {
		this.setState({ isLogged: false, loginError: false, userRole: '' })
	}
}

// cada vez que el usuario se intenta autenticar se hace una peticion
// la peticion retona si son correctas las credenciales y el rol del usuario 
  onLoginTry = async (data)  => {
    this.setState({ loginError: false })
    console.log("credentials ", data.email, data.password)
    const res = await login(data.email, data.password)
    console.log("onLoginTry res", res)
    if (res.response){
    	this.setState({ loginError: false, isLogged: true, userRole: res.role })
    }else{
    	this.setState({ loginError: true, loginCode: res.responseCode, userRole: ''})
    }
  }

  onLogoutTry = (evt) =>{
  	// romper el token
  	// cambiar estados para estar en el login nuevamente
  	evt.preventDefault();
  	this.setState({ isLogged: false, loginError: false })
  	dropItem('auth')
    dropItem('userRole')
  	// console.log('llega a exit')
  }

  render () {
    const { isLogged, userRole } = this.state
    return isLogged ? <Home onLogoutTry={this.onLogoutTry} userRole={ userRole } /> 
                    : <Login onLoginTry={this.onLoginTry} 
                    		 loginError={this.state.loginError}
                    		 loginCode={this.state.loginCode}  /> 
  }

}

export default App;