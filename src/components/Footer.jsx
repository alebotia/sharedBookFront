import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'

// import '../assets/styles/footer.css'

export default function Footer(){
  return (
      <footer>
        <div className="container-fluid bg-dark py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                 <div className="row py-2">
                   <div className="col-sm-1">
                      <a className="d-inline-block" href="#">
                        <FontAwesomeIcon className="fa fa-2x fa-fw text-white" icon={faAddressCard} /> 
                      </a>
                    </div>
                    <div className="col-sm-11 text-white">
                        <div>
                          <h4>Alejandro Botía</h4>
                        </div>
                    </div>
                </div> 
              </div>
              <div className="col-md-5">     

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

                  <div className="d-inline-block" >
                    <a href="https://www.instagram.com/alejandrobotia96" target="_blank" className="btn-floating btn-lg btn-li" type="button" role="button">                      
                      <FontAwesomeIcon className="fa fa-2x fa-fw text-white" icon={faInstagram} />
                    </a>
                </div>
                                
              </div>
            </div>
          </div>
        </div>
      </footer>
      )
}