import React, {Component} from 'react';
import PropTypes from 'prop-types'

import { getActiveBorrows } from '../libs/ApiConnections.js';

import TableElement from './TableElement.jsx'
import AlertMessage from './AlertMessage.jsx'

class BorrowedBooks extends Component{

constructor(props){
	super(props)
	this.state = {
		activeBorrows: []
	}
}

// la agregacion retorna un arreglo de documentos
// la agregacion retorna los siguientes campos 
// 'title', 'userName', 'phoneNumber', 'email','startDate', 'endDate', 'dateDifference'
async componentDidMount(){
  let borrows = await getActiveBorrows();
  // console.log('componentDidMount borrows ', borrows.activeBorrows)
  this.setState({
  	activeBorrows: borrows.activeBorrows
  })    
}

// como los campos que vienen no estan en orden se acceden programaticamente, dependiendo de la lista columnsToDisplay
render(){
	const { activeBorrows } = this.state;
	const columnsToDisplay = ['title', 'userName', 'phoneNumber', 'startDate', 'endDate', 'dateDifference']
	return(
		<div className="row d-flex flex-row py-1">
          <div className="w-100 px-4 d-flex flex-row flex-wrap align-items-center justify-content-between">            
            <div className="d-flex flex-row align-items-center">
                <h2 className="text-dark py-2 pr-4 m-0 border-gray">
                  <strong className="text-secondary"> Libros prestados </strong>
                </h2>
              </div>
          </div>
          { activeBorrows.length !== 0 ? <div className="w-100 px-4 d-flex flex-row flex-wrap justify-content-between">
          <table className="table table-hover">
          	<caption>Lista de prestamos</caption>
            <thead className="thead-dark">
	        	<TableElement data= { {'title':'Libro',
									   'userName':'Nombre Usuario',
									   'phoneNumber':'Telefono',
									   'startDate':'Fecha Inicio',
									   'endDate':'Fecha Fin',
									   'dateDifference':'Dias Entrega'} }
							  dataOrder= { columnsToDisplay }
							  RowType= 'th' />
				</thead>
			<tbody>
	            { activeBorrows.map((borrow, index) => {
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
                  mainMessage= { 'Aun no se han prestado libros. '} 
                  alternativeMessage= { 'Ingresa a la seccion Prestar para iniciar a prestar libros. '} /> }
      </div>

	)
}
}

export default BorrowedBooks;