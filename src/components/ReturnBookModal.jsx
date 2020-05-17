import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getBorrowsByBookId, returnBook } from '../libs/ApiConnections.js'
import ReturnBookItem from './ReturnBookItem.jsx'

import '../assets/styles/BorrowBookModal.css'

// la clase modal tiene un bug ni el triple hp 
// por eso la sobre escribi con la clase modal-t
class ReturnBookModal extends Component {

constructor(props){
	super(props);
	this.state = {
		showAlert: false,
		responseCode: '',
		message: '',
		currentBorrows: []
	}
}


async componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  // if ( this.props._id !== prevProps._id ){

  	if(this.props.isReturnModalOpen){
        let res = await getBorrowsByBookId(this.props._id);
        // console.log('Component did update current borrows are ', res.activeBorrows)
        this.setState({currentBorrows: res.activeBorrows})
  }

}

modalClose = () =>{
	const { onModalClose = f => f } = this.props;

	this.setState({ 
		showAlert: false
	})

	onModalClose()
}

onReturnBook = async ( bookId, borrowId ) =>{	
	// console.log('the borrow id is ', borrowId, ' the book id is ', bookId);
	let res = await returnBook(bookId, borrowId);

	this.setState({ showAlert: true,
					responseCode: res.responseCode, 
					message: res.response
				})
}

render(){ 
	// console.log('entra a entregar libro')
	const { _id, authors, onModalClose, isReturnModalOpen, title, index } = this.props;
	const { responseCode, message, showAlert, currentBorrows } = this.state


	
	// fijar el pop up segun el arreglo
	let top = '0%'
	if (index === 0 || index === 1 || index === 2){
		top = "12%"
	}else if (index === 3 || index === 4 || index === 5){
		top = "28%"
	}else if (index === 6 || index === 7 || index === 8){
		top = "55%"
	}else {
		top = "70%"
	}

	// cuales son los prestamos que se necesitan 

	// let filterBorrows = borrows.filter((doc) => doc.activeBorrow === true)
	
	const showHideClassname = isReturnModalOpen ? "modal-t display-block" : "modal-t display-none";
	return(
		<div className={ showHideClassname } >		
			  <div className="modal-dialog" style={{ 'top': top }}>
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title">Retorno de Libro</h5>
			        <button type="button" className="close" onClick={ this.modalClose } >
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			       <h5 className="modal-subtitle">{ title }</h5> 
			        { authors != undefined && authors.length === 1 ? `Autor: ${authors.join(', ')}` 
	                                       : `Autores: ${authors.join(', ')}` }
			        <br />
			        <br />

			      <div className="card" >
			  			<ul className="list-group list-group-flush">
			      	{(currentBorrows != undefined && currentBorrows.length > 0 )&& 
			      		currentBorrows.map((borrow, index) => {
			      		let ejem = index + 1
			      		// console.log('borrow is ', borrow)
			      		// console.log('borrow id is ', borrow._id)
			      		return <ReturnBookItem
			      			key= { borrow._id }
							documentNumber= { borrow.user.documentNumber }
							ejem= { ejem }
							endDate= { borrow.endDate }
							onReturnBook= {() => this.onReturnBook(_id, borrow._id) }
							userName= { borrow.user.name + ' ' + borrow.user.surname}
			      		/>			      		
			      	})}
			      	</ul>
		         </div>

			      { showAlert && <div className={ responseCode === 200 ? "alert alert-primary my-2" : "alert alert-danger my-2"} role="alert">
					  { message }
					</div>
				  }
			      </div>
			      <div className="modal-footer">
			      {/*  <button type="button" onClick={ this.onBorrowClic } className="btn btn-primary active" >Retornar</button> */}
			        <button type="button" className="btn btn-secondary" onClick={ this.modalClose } >Cerrar</button>
			      </div>
			    </div>
			  </div>
		</div>
	)};
}

// _id -> identificador del libro selccionado
// authors -> arreglo de autores del libro seleccionado
// onModalClose -> funcion que va a manejar el evento de cerrado del popup
// returnModalOpen -> valor boolean para indicar si se abre o cierra el modal
// title -> titulo del libro seleccionado
// index -> selectedIndex = indica la posicion en la pantalla en la que se debe situar el modal, basado en el indice del arreglo actual de libros

ReturnBookModal.propTypes = {
	_id: PropTypes.string,
	authors: PropTypes.array,
	onModalClose: PropTypes.func.isRequired,
	isReturnModalOpen : PropTypes.bool.isRequired,
	title: PropTypes.string,
	index: PropTypes.number.isRequired
}

ReturnBookModal.defaultProps = { index:1, authors: [] }

export default ReturnBookModal;