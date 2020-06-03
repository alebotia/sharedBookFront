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
			      	<li> 1. <strong>Préstamo de uso o Comodato:</strong> se hará entrega de un libro para su uso sin contraprestación alguna, con el compromiso de restituirlo en el tiempo estipulado y en las mismas condiciones que le fue entregado. </li>
			      	<li> 2. <strong>Cuidado de los libros:</strong> el libro se entrega en excelentes condiciones físicas; por lo tanto, debe ser devuelto de la misma manera. De no ser así, el comodatario o quien usó el libro, deberá entregar un ejemplar igual al entregado. </li>
			      	<li> 3. <strong>Hurto de libros:</strong> los libros deben entregarse en el tiempo estipulado del préstamo. De lo contrario, se iniciará denuncia ante autoridad competente. </li>
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