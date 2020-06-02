import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'

// import '../assets/styles/footer.css'

export default function Footer(){
  return (
      <footer>
      <div className="row d-flex flex-row py-1">
        <div className="container-fluid bg-dark py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                 <div className="row py-2">
                 <div className="d-inline-block" >
                      <a href="https://alebotia.github.io/personal_page/" className="btn-floating btn-lg btn-li"  target="_blank" type="button" role="button">
                        <FontAwesomeIcon className="fa fa-2x fa-fw text-white" icon={faAddressCard} /> <label className="text-white" >Alejandro Botía  </label>
                      </a>
                  </div>
                </div> 
              </div>
              <div className="col-md-5">     
                <div className="row py-2">
                  <div className="d-inline-block" >
                      <a href="https://www.linkedin.com/in/omar-alejandro-botia-navas-67a47b170/" target="_blank" className="btn-floating btn-lg btn-li" type="button" role="button">
                        <FontAwesomeIcon className="fa fa-2x fa-fw text-white fa-linkedin" icon={faLinkedin} />
                      </a>
                  </div>

                  <div className="d-inline-block" >
                    <a href="https://github.com/alebotia" target="_blank" className="btn-floating btn-lg btn-li" type="button" role="button">
                      <FontAwesomeIcon className="fa fa-2x fa-fw text-white" icon={faGithub} />
                    </a>
                  </div>  
                  {/*
                  <div className="d-inline-block" >
                    <a href="https://www.instagram.com/alejandrobotia96" target="_blank" className="btn-floating btn-lg btn-li" type="button" role="button">                      
                      <FontAwesomeIcon className="fa fa-2x fa-fw text-white" icon={faInstagram} />
                    </a>
                  </div>
                */}
                </div>            
              </div>
            </div>
          </div>
        </div>
      </div>
      </footer>
      )
}