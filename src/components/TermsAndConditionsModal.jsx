import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../assets/styles/BorrowBookModal.css'
// la clase modal tiene un bug ni el triple hp 
// por eso la sobre escribi con la clase modal-t
class TermsAndConditionsModal extends Component {

constructor(props){
	super(props);
}

modalClose = () =>{
	const { onModalClose = f => f } = this.props;
	onModalClose()
}

render(){
	const { isModalOpen } = this.props
	
	const showHideClassname = isModalOpen ? "modal-t display-block" : "modal-t display-none";
	return(
		<div className={ showHideClassname } >		
			  <div className="modal-dialog">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title">Terminos y condiciones</h5>
			        <button type="button" className="close" onClick={ this.modalClose } >
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			      <ul>
			      <h5 className="modal-subtitle">Este proyecto se base en tres conductas bastante simples:</h5>
			      	<li> 1. <strong>Cuida los libros:</strong> este proyecto es mas interesante en cuanto mas personas puedan acceder a los libros <strong>si dañas un libro DEBES entregar un ejemplar igual</strong> </li>
			      	<li> 2. <strong>No robes los libros:</strong> de mas esta decir que no te robes los libros, este proyecto es por y para la comunidad asi que a quien afectas con eso es a las personas que estan a tu alrededor. <strong>Quien lee no roba, quien roba no lee.</strong></li>
			      	<li> 3. <strong>Devuelve los libros a tiempo:</strong> al igual que tu tambien hay otras personas que desean leer el libro y estan esperando a que termines </li>
			      </ul>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" onClick={ this.modalClose } >Cerrar</button>
			      </div>
			    </div>
			  </div>
		</div>
	)};
}

TermsAndConditionsModal.propTypes = {	
	onModalClose: PropTypes.func.isRequired,
	isModalOpen : PropTypes.bool
}

export default TermsAndConditionsModal;