import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FormElement from './FormElement.jsx'
import AlertMessage from './AlertMessage.jsx'

import '../assets/styles/LoginMain.css';
import '../assets/styles/LoginUtil.css';

import bgImage from '../images/login/bg-05.jpg';

import { saveBook } from '../libs/ApiConnections'

class AddBook extends Component{
	
	constructor(){
		super()

		this.state = {
			title: '',
			authors: '',
			genres: '',
			numberOfCopies: '',
			location: '',
			idiom: 'Español',
			showMessage: false,
		}
	}

	handleInputChange = (evt) =>{
	    const target = evt.target;
	    const value = target.type === 'chekbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
  	}


	handleSubmit = async (e) => {
	  e.preventDefault()
	  const data = {title: this.state.title,
			  authors: this.state.authors,
			  genres: this.state.genres,
			  numberOfCopies: this.state.numberOfCopies,
			  location: this.state.location,
			  idiom: this.state.idiom}

	  // console.log('handleSubmit on add user', data)
	  let res = await saveBook(data)

	  if (await res.responseCode !== 200){
	  	// console.log('error response')
	  	this.setState({
	  		showMessage: true,
	  		alertType: 'error',
			mainMessage: res.response,
			alternativeMessage: ''
		})	

	  }else{
	  	this.setState({
	  		title: '',
			authors: '',
			genres: '',
			numberOfCopies: '',
			location: '',
			idiom: 'Español',

	  		showMessage: true,
	  		alertType: 'success',
			mainMessage: res.response,
			alternativeMessage: 'Puedes adicionar otro libro en caso de ser necesario'
		})	  	
	  }
	}

	render(){
		const { title, authors, genres, numberOfCopies, location, idiom } = this.state;
		const { showMessage, alertType, mainMessage, alternativeMessage } = this.state;
		return (
			
			<div className="align-middle px-12 mx-auto">
				<div className="login100-form-title" style={{"backgroundImage": `url(${bgImage})`}}>
					<span className="login100-form-title-1">
						Agregar Libro
					</span>
				</div>
				<form className="login100-form validate-form" onSubmit={this.handleSubmit}>

					<FormElement inputName= "title"
								 inputType= "text"
								 inputValue= {title}
					 			 label = "Titulo"
								 onChangeFunc= { this.handleInputChange } />

					<FormElement helper= "Si hay mas de un autor, ingresarlos separados por coma"
								 inputName= "authors"
								 inputType= "text"
								 inputValue= {authors}
					 			 label = "Autor"
								 onChangeFunc= { this.handleInputChange } />

					<FormElement helper= "Si el libro pertenece a mas de un genero, ingresarlos separados por coma"
								 inputName= "genres"
								 inputType= "text"
								 inputValue= {genres}
					 			 label = "Genero Literario"
								 onChangeFunc= { this.handleInputChange } />

					<FormElement inputName= "numberOfCopies"
								 inputType= "number"
								 inputValue= {numberOfCopies}
					 			 label = "Numero de copias"
								 onChangeFunc= { this.handleInputChange } />

					<FormElement inputName= "location"
								 inputType= "text"
								 inputValue= {location}
					 			 label = "Ubicacion"
								 onChangeFunc= { this.handleInputChange } />

					<FormElement inputName= "idiom"
								 inputType= "text"
								 inputValue= {idiom}
					 			 label = "Idioma"
								 onChangeFunc= { this.handleInputChange } />
								 					
					<div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Agregar Usuario
						</button>
					</div>
					{this.state.showMessage && <AlertMessage 
									  			alertType= { alertType}
									  			mainMessage= { mainMessage} 
									  			alternativeMessage= { alternativeMessage} />
					}	
				</form>		
			</div>
		)

	}
}
export default AddBook;