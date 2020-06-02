import React, {Component} from 'react';
import PropTypes from 'prop-types'

import { getBooksPerPage, scheduleBook } from '../libs/ApiConnections.js';

import BookCard  from './BookCard.jsx'
import Pagination  from './Pagination.jsx'
import SearchBox from './SearchBox.jsx'
import AlertMessage from './AlertMessage.jsx'
import BorrowBookModal from './BorrowBookModal.jsx'
import ReturnBookModal from './ReturnBookModal.jsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-solid-svg-icons'

class BorrowBook extends Component{
  constructor(props){
      super(props);
      this.state = { currentBooks: [],
                     eventType: 'PAGINATION',
                     isWordActivate: false,
                     currentWord: '',

                     isBorrowModalOpen: false,
                     isReturnModalOpen: false
                   }
  }

  async componentDidMount(){
    // console.log('entra a componentDidMount')
    let books = await getBooksPerPage(1, this.props.itemsPerPage);
    this.setState({ currentPage: books.currentPage, 
                    currentBooks: books.books,
                    totalPages: books.pageCount,
                    totalItems: books.totalCount
     })    
  }
  // el objeto data contiene los siguientes atributos 
  // obligatorios
  // EVENTTYPE para ver si el evento es de paginacion o de caja de texto
  // PAGE controla la pagina en la que va,
  //      cuando es por paginacion el metodo FETCHPAGENUMBERS calcula cuales son las paginas
  //      cuando es por busqueda retorna el numero de paginas que l servidor retorna y recalcula
  onPageChanged = async (data)  => {
    // valida si es paginacion el evento que disparo la funcion
    // si es paginacion valida si hay alguna palabra activa para seguir recorriendo esa lista
    if(data.eventType === 'PAGINATION'){      
      if(this.state.isWordActivate){  
        let books = await getBooksPerPage(data.currentPage, this.props.itemsPerPage, this.state.currentWord);
        this.setState({ 
                currentPage: books.currentPage, 
                currentBooks: books.books,
                totalPages: books.pageCount,
                totalItems: books.totalCount
        })
      }else{
        // si es paginacion pero no hay palabra activada solo consulta el siguiente evento  
        let books = await getBooksPerPage(data.currentPage, this.props.itemsPerPage);
        this.setState({ 
                currentPage: books.currentPage, 
                currentBooks: books.books,
                totalPages: books.pageCount,
                totalItems: books.totalCount
        }) 
      }

     }else{
      // si no es paginacion va a buscar una nueva paralabra
      // activa en el estado isWordActivated
      try {
        let books = await getBooksPerPage(data.currentPage, this.props.itemsPerPage, data.word);
        

        this.setState({ currentPage: books.currentPage, 
                currentBooks: books.books,
                totalPages: books.pageCount,
                totalItems: books.totalCount,
                currentWord: data.word,
                isWordActivate: true

        })}
        catch(e){
          // console.log('error onPageChanged', e)
        }
    }
  }


  // este metodo es usado por los modales de prestar y retornar libro
  // se recarga la pagina para mostrar la actualizacion 
  onModalClose = () =>{
    // console.log('enter onModalClose')
    const { isWordActivate, currentPage,  currentWord} = this.state;
    
    const eventType = 'PAGINATION'
    let data = {currentPage, eventType}

    this.onPageChanged( data )
    this.setState({ isBorrowModalOpen: false, isReturnModalOpen: false})
  }

// recibe el author es un arreglo de elementos
// En este ejemplo se puede ver que la actualizacion del arbol no se hace de forma sincrona
// en el log se va a ver el arbol anterior
  openModal = (_id, title, authors, index, type ) =>{
    // console.log('event on book clicked', _id, title, authors)
    const selectedId= _id;
    const selectedTitle= title;
    const selectedAuthors= authors;
    const selectedIndex= index;

    if (type === 'BORROW' ){
      this.setState({ 
        selectedId,
        selectedTitle,
        selectedAuthors,
        selectedIndex,
        isBorrowModalOpen: true
      })

    }else {
      // modificacion cuando es una retorno/entrega
      // console.log('modifica estados de retorno/entrega')
      this.setState({ 
        selectedId,
        selectedTitle,
        selectedAuthors,
        selectedIndex,
        isReturnModalOpen: true
      })
    // console.log('estados actualizados ', this.state)
    }
  }

// Agenda el libro y recarga la pagina para que se vea actualizado el numero de peticiones
  onScheduleBook = async (bookId) => {
    // console.log('on onScheduleBook')
    let res = await scheduleBook(bookId);
    alert(res.response)

    const { isWordActivate, currentPage,  currentWord} = this.state;
    
    const eventType = 'PAGINATION'
    let data = {currentPage, eventType}

    this.onPageChanged( data )  

  }

  render(){
  // Estados utilizados en la paginacion
  const { currentBooks, currentPage, totalPages, totalItems} = this.state; 
  // Estados utilizados por ambos prestamo/entrega
  const { selectedId, selectedTitle, selectedAuthors, selectedIndex } = this.state; 
  // Estados utilizados en modal de prestamo 
  const { isBorrowModalOpen } = this.state;
  // estados utilizados en modal de entrega 
  const { isReturnModalOpen } = this.state;
  // visualizacion de la pagina actual
  const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
    return (
          <>
          <div className="row d-flex flex-row py-1">
            <div className="w-100 px-4 d-flex flex-row flex-wrap align-items-center justify-content-between">            
              <div className="d-flex flex-row align-items-center">
                  <h2 className={headerClass}>
                    <strong className="text-secondary">{totalItems}</strong> Libros
                  </h2>

                  { currentPage && (
                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                      Pagina <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                    </span>
                  ) }
              </div>

              <SearchBox onSearchChanged={this.onPageChanged} />

              <div className="d-flex flex-row py-4 align-items-center">
                   { totalItems && <Pagination 
                                          totalRecords={totalItems}
                                          currentPage={currentPage}                                
                                          totalPages={totalPages}
                                          pageNeighbours={1}
                                          onPageChanged={this.onPageChanged} />
                    }
              </div>
            </div>
            { totalItems !== 0 ? <div className="w-100 px-4 d-flex flex-row flex-wrap justify-content-between">

                  { currentBooks.map((book, index) => 
                    { 
                      return <BookCard 
                        key={ book._id }
                        title={ book.title }
                        authors={ book.authors }
                        genres={ book.genres }
                        numberOfCopies={ book.numberOfCopies }
                        activeBorrowCount={ book.activeBorrowCount } 
                        location={ book.location } 
                        schedule={ book.schedule }
                        onBorrowBook={() => this.openModal( book._id, book.title, book.authors, index, 'BORROW') }
                        onReturnBook={() => this.openModal( book._id, book.title, book.authors, index, 'RETURN') }
                        onScheduleBook={ () => this.onScheduleBook(book._id) }
                        userRole= { this.props.userRole }
                         />
                      }
                  
                   ) } 
            
            </div>
            :<AlertMessage 
                    alertType= { 'info'}
                    mainMessage= { 'No existen libros que cumplan con el criterio buscado! '} 
                    alternativeMessage= { 'Si piensas que se trata de un error contacta al adminstrador de la plataforma'} />
            }
            {/*
            // _id -> identificador del libro selccionado
            // authors -> arreglo de autores del libro seleccionado
            // onModalClose -> funcion que va a manejar el evento de cerrado del popup
            // openModal -> valor boolean para indicar si se abre o cierra el modal
            // title -> titulo del libro seleccionado
            // index -> selectedIndex = indica la posicion en la pantalla en la que se debe situar el modal, basado en el indice del arreglo actual de libros
            */}  
            <BorrowBookModal _id= { selectedId }
            authors= { selectedAuthors }
            onModalClose= { this.onModalClose }
            isBorrowModalOpen= { isBorrowModalOpen }
            title= { selectedTitle } 
            index= { selectedIndex }/>
            {/*
            // _id -> identificador del libro selccionado
            // authors -> arreglo de autores del libro seleccionado
            // onModalClose -> funcion que va a manejar el evento de cerrado del popup
            // openModal -> valor boolean para indicar si se abre o cierra el modal
            // title -> titulo del libro seleccionado
            // index -> selectedIndex = indica la posicion en la pantalla en la que se debe situar el modal, basado en el indice del arreglo actual de libros
            */}  
            <ReturnBookModal _id= { selectedId }
            authors= { selectedAuthors }
            onModalClose= { this.onModalClose }
            isReturnModalOpen= { isReturnModalOpen }
            title= { selectedTitle } 
            index= { selectedIndex } />
          </div>
          </>


  )}
}

BorrowBook.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    userRole: PropTypes.string.isRequired
}

export default BorrowBook;