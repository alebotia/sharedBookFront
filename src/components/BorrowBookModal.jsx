import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es';

import { returnBookDate, availableReturnDate } from '../libs/Helpers.js'
import { validateUser, borrowBook } from '../libs/ApiConnections.js'

import SearchBoxUser from './SearchBoxUser.jsx'

import '../assets/styles/BorrowBookModal.css'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('es', es)

// la clase modal tiene un bug ni el triple hp 
// por eso la sobre escribi con la clase modal-t
class BorrowBookModal extends Component {

constructor(props){

	super(props);
	this.state = {
		endDate: returnBookDate(),
		userDocument: '',

		isUserValid: false,
		showAlert: false,
		responseCode: '',
		message: ''
	}
}

// Events of search box
handleInputChange = evt =>{
    const target = evt.target;
    const value = target.type === 'chekbox' ? target.checked : target.value;
    const name = target.name;
    // console.log('input change', name)
    this.setState({
      [name]: value
    });
}

handleClic = evt =>{
	const documentNumber = this.state.userDocument;
    this.onValidateUser({ documentNumber });
}

enterPressed = evt => {
    var code = evt.keyCode || evt.which;
    if(code === 13) { //13 is the enter keycode
		const documentNumber = this.state.userDocument;
	    this.onValidateUser({ documentNumber });
    } 
}
// end of events of search box

onDateChange = date =>{
	this.setState({ endDate: date })
} 

onValidateUser = async (data)  => {
	// consultar usuario y condiciones 
	// no mas de 3 libros 
	// documento existe
	// no tiene un prestamo activo de este mismo libro
	// console.log('data is ', data)
	const bookId = this.props._id;
	let userDoc= data.documentNumber;
	let res = await validateUser(userDoc, bookId)
	// console.log('onValidateUser res ', res)
	if(res.responseCode === 200){
		this.setState({ isUserValid: true,
						showAlert: true,
						responseCode: res.responseCode, 
						message: res.response,
						documentNumber: userDoc,
						userId: res.userId
					})
	}else{
		this.setState({ isUserValid: false,
						showAlert: true,
						responseCode: res.responseCode, 
						message: res.response
					})
	}
}

modalClose = () =>{
	const { onModalClose = f => f } = this.props;

	this.setState({ 
		endDate: returnBookDate(),
		userDocument: '',
		isUserValid: false,
		showAlert: false
	})

	onModalClose()
}

onBorrowClic = async (evt) =>{
	evt.preventDefault()
	const { _id } = this.props;
	// let { userId, endDate } = this.state;
	let data = { bookId: _id,
				 userId: this.state.userId,
				 endDate: this.state.endDate.toISOString() }
	let res = await borrowBook(data)

	this.setState( {
		message: res.response,
		responseCode: res.responseCode
	} )

}

render(){
	// console.log('entra a prestar libro')
	const { _id, authors, onModalClose, isBorrowModalOpen, title, index} = this.props;
	const { endDate, userDocument, isUserValid, responseCode, message, showAlert} = this.state
	// console.log('isUserValid ',isUserValid)
	let top = '0%'
	if (index === 0 || index === 1 || index === 2){
		top = "15%"
	}else if (index === 3 || index === 4 || index === 5){
		top = "28%"
	}else if (index === 6 || index === 7 || index === 8){
		top = "55%"
	}else {
		top = "70%"
	}
	const showHideClassname = isBorrowModalOpen ? "modal-t display-block" : "modal-t display-none";
	return(
		<div className={ showHideClassname } >		
			  <div className="modal-dialog" style={{ 'top': top }}>
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title">Prestamo de Libro</h5>
			        <button type="button" className="close" onClick={ this.modalClose } >
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			       <h5 className="modal-subtitle">{ title }</h5> 
			        { authors.length === 1 ? `Autor: ${authors.join(', ')}` 
	                                       : `Autores: ${authors.join(', ')}` }
			        <br />

			        <SearchBoxUser enterPressed = { this.enterPressed }
			        			   handleClic = { this.handleClic }
			        			   handleInputChange = { this.handleInputChange }
			        			   inputName = "userDocument"
			        			   userDocument = { userDocument } />

			        <label>Fecha de entrega: </label>
		        		<span style={{ "height": "40px" }}>
		        		<DatePicker 
		        		selected= { endDate } 
		        		minDate= { new Date() }
  						maxDate= { availableReturnDate() }
  						onChange= { this.onDateChange }
  						showDisabledMonthNavigation
  						dateFormat="dd 'de' MMMM 'de' yyyy"
  						locale="es" 
  						className="react-datepicker ml-2 text-center"
  						/>
  						</span>
			      { showAlert && <div className={ responseCode === 200 ? "alert alert-primary my-2" : "alert alert-danger my-2"} role="alert">
					  { message }
					</div>
				  }
			      </div>
			      <div className="modal-footer">
			        <button type="button" onClick={ this.onBorrowClic } disabled= { !isUserValid } className={ isUserValid ? "btn btn-primary active" : "btn btn-primary disabled" }>Prestar</button>
			        <button type="button" className="btn btn-secondary" onClick={ this.modalClose } >Cerrar</button>
			      </div>
			    </div>
			  </div>
		</div>
	)};
}

BorrowBookModal.propTypes = {
	_id: PropTypes.string,
	authors: PropTypes.array,
	onModalClose: PropTypes.func.isRequired,
	isBorrowModalOpen : PropTypes.bool.isRequired,
	title: PropTypes.string,
	index: PropTypes.number.isRequired
}

BorrowBookModal.defaultProps = { index:1, authors: []}

export default BorrowBookModal;