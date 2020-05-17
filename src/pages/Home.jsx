import React, {Component} from 'react';
import PropTypes from 'prop-types'

// Paginas/Componentes
import BorrowBook from '../components/BorrowBook.jsx'
import AddBook from '../components/AddBook.jsx'
import AddUser from '../components/AddUser.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import SubMenuItem from '../components/SubMenuItem.jsx'
import BorrowedBooks from '../components/BorrowedBooks.jsx'
import UpdateUser from '../components/UpdateUser.jsx'
import ScheduledBooks from '../components/ScheduledBooks.jsx'

// icons menu and books submenu
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { faJournalWhills } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

// icons user submenu
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { faUserTimes } from '@fortawesome/free-solid-svg-icons'

import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";

// get quotes
import { getQuote } from '../libs/ApiConnections.js';

const itemsPerPage = 12;

class Home extends Component  {
// en el constructor se inicializan si el menu esta abierto
// cual pestaña del menu se muesta 
// cual es la pagina/componente que se va a visualizar

  constructor(props){
    super(props)
    
    // this.state = { isMenuOpened: false, subMenuOpen: 'USERS', currentOption: "MODIFICAR_USUARIO"}    
    this.state = { isMenuOpened: true, subMenuOpen: 'BOOKS', currentOption: "LIBROS_PRESTAR"}    
  }

  async componentDidMount(){
    let res = await getQuote();
    // console.log('componentDidMount user ', res.quote )
    if(res.quote != undefined){
      this.setState({
        quote: res.quote[0]
      })
    }
  }
// metodos para controlar el menu
  onSetSidebarOpen = () => {
    // toggles the menu opened state
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  }

  onMenuChange = (evt) => {
    if (evt.target.name  === 'BOOKS'){
      if (this.state.subMenuOpen !== 'BOOKS')
        this.setState({ subMenuOpen: 'BOOKS' })
      else {
        this.setState({ subMenuOpen: '' })
      }
    }
    else if (evt.target.name  === 'USERS'){
      if (this.state.subMenuOpen !== 'USERS')
        this.setState({ subMenuOpen: 'USERS' })
      else {
        this.setState({ subMenuOpen: '' })
      }
    }
  }

  onPageChange = (evt) => {
    // console.log(evt.target.name)
      switch(evt.target.name) {
      case "LIBROS_PRESTAR":
        this.setState({ currentOption: "LIBROS_PRESTAR" })
        break;
      case "LIBROS_PRESTADOS":
        this.setState({ currentOption: "LIBROS_PRESTADOS" })
        break;
      case "AGREGAR_LIBROS":
        this.setState({ currentOption: "AGREGAR_LIBROS" })
        break;
      case "MODIFICAR_LIBRO":
        this.setState({ currentOption: "MODIFICAR_LIBRO" })
        break;
      case "LIBROS_AGENDADOS":
        this.setState({ currentOption: "LIBROS_AGENDADOS" })
        break;
      case "ELIMINAR_LIBRO":
        this.setState({ currentOption: "ELIMINAR_LIBRO" })
        break;
      case "AGREGAR_USUARIO":
        this.setState({ currentOption: "AGREGAR_USUARIO" })
        break;
      case "MODIFICAR_USUARIO":
        this.setState({ currentOption: "MODIFICAR_USUARIO" })
        break;
      case "ELIMINAR_USUARIO":
        this.setState({ currentOption: "ELIMINAR_USUARIO" })
        break;
        default:
          // console.warn("Evento del menu no definido", evt.target.name)
    }
  }
// fin metodos controlar menu

  render(){      
      const { onLogoutTry, userRole } = this.props;
      const { subMenuOpen,  currentOption, quote } = this.state;
      // if (totalItems === 0) return <label>No hay libros que corresponda al criterio</label>;
      return ( 
        <>       
        <div className="container mb-5">

      <OffCanvas
        width= {200}
        transitionDuration= {300}
        effect= {"parallax"}
        isMenuOpened= {this.state.isMenuOpened}
        position= {"left"}
        className= "mr-4"
      >
      {/* Este es el cuerpo de la aplicacion, dependiendo la opcion se visualiza una pagina/componente*/}
        <OffCanvasBody className= "ml-4">
          <Navbar onLogoutTry={onLogoutTry} onSetSidebarOpen= {this.onSetSidebarOpen} quote= { quote }/>
          {/* Renderizado condicional dependiendo cual es el item seleccionado del submenu */}
          { currentOption === "LIBROS_PRESTAR" && <BorrowBook itemsPerPage={itemsPerPage} userRole= { this.props.userRole } /> }
          { currentOption === "LIBROS_PRESTADOS" && <BorrowedBooks /> }
          { currentOption === "AGREGAR_LIBROS" && <AddBook /> }
          { currentOption === "LIBROS_AGENDADOS" && <ScheduledBooks /> }

          { currentOption === "AGREGAR_USUARIO" && <AddUser type= 'ADD' /> }
          { currentOption === "MODIFICAR_USUARIO" && <UpdateUser /> }
          
        </OffCanvasBody>

      {/* Se realizo un toggle menu dependiendo de un estado que este seleccionado */}
        <OffCanvasMenu className="bg-light">
      {/* cabecera del menu */}
          <div className= "w-100 px-4 d-flex flex-row flex-wrap align-items-center justify-content-between text-white bg-dark">
            <h4 className = "px-3 py-2" style= {{'margin': 'unset'}}> 
            <FontAwesomeIcon icon={ faHouseUser } /> Menu </h4>
            <a href="#" onClick={ this.onSetSidebarOpen }> <h4 style= {{'margin': 'unset'}} className="text-white"> <FontAwesomeIcon icon={ faTimes } /> </h4> </a>
          </div> 

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
               <button  type="button" name="BOOKS" onClick={ this.onMenuChange }>
                  <FontAwesomeIcon icon={ faJournalWhills } /> Libros 
                </button>
                
                {subMenuOpen === 'BOOKS' &&
                <div >
                  <ul className="list-group list-group-flush">

                  <SubMenuItem currentOption= { currentOption }
                               icon= { faBookOpen }
                               label= "Prestar"
                               onClickFunction= { this.onPageChange }
                               optionName= "LIBROS_PRESTAR" />

                  <SubMenuItem currentOption= { currentOption }
                               icon= { faExchangeAlt }
                               label= "Prestamos"
                               onClickFunction= { this.onPageChange }
                               optionName= "LIBROS_PRESTADOS" />

                  { userRole === 'ROLE_ADMIN' &&             
                  <SubMenuItem currentOption= { currentOption }
                               icon= { faPlus }
                               label= "Agregar"
                               onClickFunction= { this.onPageChange }
                               optionName= "AGREGAR_LIBROS" />
                  }
                  { userRole === 'ROLE_ADMIN' &&             
                  <SubMenuItem currentOption= { currentOption }
                               icon= { faPencilAlt }
                               label= "Agendados"
                               onClickFunction= { this.onPageChange }
                               optionName= "LIBROS_AGENDADOS" />
                  }
                  {/*
                  <SubMenuItem currentOption= { currentOption }
                               icon= { faPencilAlt }
                               label= "Modificar"
                               onClickFunction= { this.onPageChange }
                               optionName= "MODIFICAR_LIBRO" />

                  <SubMenuItem currentOption= { currentOption }
                               icon= { faMinus }
                               label= "Eliminar"
                               onClickFunction= { this.onPageChange }
                               optionName= "ELIMINAR_LIBRO" />
                  */}
                  </ul>
                </div> }

            </li>
            { userRole === 'ROLE_ADMIN' &&
            <li className="list-group-item" onClick={this.onMenuChange}>
              <button  type="button" name="USERS" onClick={ this.onMenuChange }>
                <FontAwesomeIcon icon={ faUsers } /> Usuarios
              </button>

              { subMenuOpen === 'USERS' && 
              <div>
                <ul className="list-group list-group-flush">

                <SubMenuItem currentOption= { currentOption }
                             icon= { faUserPlus }
                             label= "Agregar"
                             onClickFunction= { this.onPageChange }
                             optionName= "AGREGAR_USUARIO" />

                <SubMenuItem currentOption= { currentOption }
                             icon= { faUserEdit }
                             label= "Modificar"
                             onClickFunction= { this.onPageChange }
                             optionName= "MODIFICAR_USUARIO" />
                {/*
                <SubMenuItem currentOption= { currentOption }
                             icon= { faUserTimes }
                             label= "Eliminar"
                             onClickFunction= { this.onPageChange }
                             optionName= "ELIMINAR_USUARIO" />

                */}

                </ul>
              </div> }
            </li>
          }
          </ul>
        </OffCanvasMenu>
      </OffCanvas>        
        </div>
        <Footer />
        </>
      );
  }
}

Home.propTypes = {
    onLogoutTry: PropTypes.func.isRequired,
    userRole: PropTypes.string.isRequired
}

export default Home;