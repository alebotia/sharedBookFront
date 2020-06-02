import React from 'react';
// import logo from '../images/page/share-book.png';
import logo from '../images/page/literature_exchange.png';
import logout from '../images/page/Logout.png';
import PropTypes from 'prop-types'

export default function Navbar({ onLogoutTry, onSetSidebarOpen, quote}){
	// console.log('quote is ', quote)
	return (
		<>
		<nav className="navbar navbar-light justify-content-between">
		<div className="row">
			
			  <a className="navbar-brand " href="#" onClick= { onSetSidebarOpen }>
			    <img src={ logo } width="60" height="60" className="d-inline-block align-top" alt="Shared Books" />
			    <label className="mb-0 h1 px-3"> Shared Books </label>
			  </a>
			
			{/* 
			  <div className="col-5 ml-2">
			
			{ quote != undefined && <blockquote className="blockquote">
				  <p className="mb-0">{ quote.quote }</p>
				  <footer className="blockquote-footer"> 
				{ quote.author } 
				  </footer>
				</blockquote>
			}			
			</div>
			*/}
			
			  <a className="navbar-brand " href="#" onClick= { onLogoutTry }>
			    <img src={ logout } width="60" height="60" className="d-inline-block align-top" alt="Exit" />
			  </a>
			
		</div>
		</nav>
		</>
	)
}

Navbar.propTypes = {
    onLogoutTry: PropTypes.func.isRequired,
    onSetSidebarOpen: PropTypes.func.isRequired,
    quote: PropTypes.object
}