import React, {Component} from 'react';
import PropTypes from 'prop-types'

import { getAllUsers } from '../libs/ApiConnections.js';

import AddUser from './AddUser.jsx'
import TableElement from './TableElement.jsx'
import AlertMessage from './AlertMessage.jsx'

class UpdateUser extends Component{


// currentPage controla cual componente se va a ver en pantalla 
// si es USERS se muestra la lista de usuarios
// si UPDATE se muestra add user component
constructor(props){
	super(props)
	this.state = {
		users: [],
		currentComponent: 'USERS'
	}
}

async componentDidMount(){
  let res = await getAllUsers();
  // console.log('componentDidMount user ', res.users )
  this.setState({
  	users: res.users
  })    
}

userToUpdate = async (index) =>{
	let userToUpdate = this.state.users[index];
	// console.log('user to update ', userToUpdate);
	this.setState({
		userId: userToUpdate._id,
		name: userToUpdate.name,
		surname: userToUpdate.surname,
		phoneNumber: userToUpdate.phoneNumber,
		documentNumber: userToUpdate.documentNumber,
		dobDate: userToUpdate.dob,

		currentComponent: 'UPDATE'
	})
}

comeBackFunction = async () =>{
	if (this.state.currentComponent === 'UPDATE'){
		let res = await getAllUsers();
		this.setState({
			currentComponent: 'USERS',
			users: res.users
		})
	}else {
		this.setState({
			currentComponent: 'UPDATE'
		})
	}
}

render(){
	// dependiendo del usuario seleccionado se envian las propiedades
	const { userId, name, surname, phoneNumber, documentNumber, dobDate } = this.state;
	// variables de control del componente
	// console.log('variables ', phoneNumber, ' doc ', documentNumber, ' date ', dobDate)
	const { users, currentComponent } = this.state;
	// const columnsToDisplay = ['name', 'surname', 'email', 'password', 'dobDate', 'documentNumber', 'phoneNumber']
	const columnsToDisplay = ['name', 'surname', 'dob', 'documentNumber', 'phoneNumber']
	return(
	currentComponent === 'USERS' ?	
	<div className="row d-flex flex-row py-1">
        <div className="w-100 px-4 d-flex flex-row flex-wrap align-items-center justify-content-between">            
          <div className="d-flex flex-row align-items-center">
              <h2 className="text-dark py-2 pr-4 m-0 border-gray">
                <strong className="text-secondary"> Actualizar Usuario </strong>
              </h2>
            </div>
        </div>
        { users.length !== 0 ? <div className="w-100 px-4 d-flex flex-row flex-wrap justify-content-between">
        <table className="table table-hover">
        	<caption>Actualizar Usuario</caption>
            <thead className="thead-dark">
	        	<TableElement data= { {'name': 'Nombre',
	        						   'surname': 'Apellido',
	        						   'dob': 'Fecha De Nacimiento',
	        						   'documentNumber': 'Documento',
	        						   'phoneNumber': 'Telefono',
	        						   'update': 'Actualizar'} }
							  dataOrder= { ['name', 'surname', 'dob', 'documentNumber', 'phoneNumber', 'update'] }
							  RowType= 'th' />
				</thead>
			<tbody>
	            { users.map((user, index) => {
	            	return 	<TableElement key= { index }
	            				  data= { user }
								  dataOrder= { columnsToDisplay }
								  RowType= "td"
								  onClick= {() => this.userToUpdate(index)}
								  onClickLabel= "Actualizar"/>
	            }) }
	            </tbody>
        </table>
        </div>
        :<AlertMessage 
                alertType= { 'info'}
                mainMessage= { 'No se han encontrado usuarios '} 
                alternativeMessage= { 'Ingresa a la seccion Usuarios/Agregar para Agregar un usuario. '} /> }
    </div>
	: <AddUser type= "UPDATE"
			   userId= { userId }
			   name= { name }
			   surname= { surname }
			   phoneNumber= { String(phoneNumber) }
			   dobDate= { dobDate } 
			   comeBackFunction = { this.comeBackFunction } />
	)
}
}

export default UpdateUser;