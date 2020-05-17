import React, {Component} from 'react';
import PropTypes from 'prop-types'

import { getActiveSchedules } from '../libs/ApiConnections.js';

import TableElement from './TableElement.jsx'
import AlertMessage from './AlertMessage.jsx'

class ScheduledBooks extends Component{

constructor(props){
	super(props)
	this.state = {
		activeSchedules: []
	}
}

// la agregacion retorna un arreglo de documentos
// la agregacion retorna los siguientes campos 
// 'title', 'startDate', 'userName', 'phoneNumber', 'email'
async componentDidMount(){
  let schedules = await getActiveSchedules();
  // console.log('componentDidMount schedules ', schedules.activeSchedules)
  this.setState({
  	activeSchedules: schedules.activeSchedules
  })    
}

// como los campos que vienen no estan en orden se acceden programaticamente, dependiendo de la lista columnsToDisplay
render(){
	const { activeSchedules } = this.state;
	const columnsToDisplay = ['title','userName','phoneNumber','email','startDate']
	return(
		<div className="row d-flex flex-row py-1">
          <div className="w-100 px-4 d-flex flex-row flex-wrap align-items-center justify-content-between">            
            <div className="d-flex flex-row align-items-center">
                <h2 className="text-dark py-2 pr-4 m-0 border-gray">
                  <strong className="text-secondary"> Libros agendados </strong>
                </h2>
              </div>
          </div>
          { activeSchedules.length !== 0 ? <div className="w-100 px-4 d-flex flex-row flex-wrap justify-content-between">
          <table className="table table-hover">
          	<caption>Lista de libros agendados</caption>
            <thead className="thead-dark">
	        	<TableElement data= { {'title':'Libro',
									   'userName':'Nombre Usuario',
									   'phoneNumber':'Telefono',
									   'email':'Correo',
									   'startDate':'Fecha Inicio',
									   } }
							  dataOrder= { columnsToDisplay }
							  RowType= 'th' />
				</thead>
			<tbody>
	            { activeSchedules.map((borrow, index) => {
	            	return 	<TableElement key= { index }
	            				  data= { borrow }
								  dataOrder= { columnsToDisplay }
								  RowType= "td" />
	            }) }
	            </tbody>
          </table>
          </div>
          :<AlertMessage 
                  alertType= { 'info'}
                  mainMessage= { 'Aun no se han agendado libros. '} 
                   /> }
      </div>

	)
}
}

export default ScheduledBooks;