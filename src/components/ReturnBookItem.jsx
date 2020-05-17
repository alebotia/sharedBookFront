import React from 'react'
import PropTypes from 'prop-types'

import Date from './Date.jsx'

export default function ReturnBookItem ({ documentNumber, ejem,  endDate, onReturnBook, userName}){
	return (
			<li className= "list-group-item">
			    <div className="text-left">
			    	<label><strong> {'Prestamo ' + ejem} </strong></label>
			    	<br />
			    	<label> <strong> Usuario: </strong> { userName } </label>
			    	<br />
			    	<label> <strong> Documento: </strong> { documentNumber } </label>
			    	<br />
  					{ endDate != undefined && <label> <strong> Fecha estimada de entrega: </strong> <Date dateString= { endDate } /> </label>}
  				</div>
  				<div className="text-right">
  					<button className="btn btn-primary active" 
  					 		type="button" 
  							onClick={ onReturnBook } >
  							Retornar</button>
  				</div>
			</li>
	)

}

ReturnBookItem.propTypes = {
	documentNumber: PropTypes.number.isRequired,
	ejem: PropTypes.number.isRequired,
	endDate: PropTypes.string,
	onReturnBook: PropTypes.func.isRequired,
	userName: PropTypes.string.isRequired
}