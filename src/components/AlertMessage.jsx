import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-solid-svg-icons'
import { faLaughBeam  } from '@fortawesome/free-solid-svg-icons'

export default function AlertMessage({ alertType, mainMessage, alternativeMessage }){
	let alertClass = "alert mt-3 ml-3 " // no eliminar el espacio del final, se concatena luego en el if

	// valida que tipo de mensaje se debe mostrar 
	if (alertType === 'success'){
		alertClass += 'alert-success'
	}else if(alertType === 'error'){
		alertClass += 'alert-danger'
	}else {
		alertClass += 'alert-primary'
	}


	return (
    <div className= { alertClass } role= "alert">
	{/* si el alert no es de tipo success valida que color debe tener la carita alternativa, rojo o azul */}
      { alertType === 'success'
      	? <h3 className="alert-heading">Felicidades !! <FontAwesomeIcon className="fa fa-1x fa-fw text-green" icon={ faLaughBeam } /> </h3>
      	: <h3 className="alert-heading">Oops !! 
      	<FontAwesomeIcon className= { alertType === 'error' ? "fa fa-1x fa-fw text-red" : "fa fa-1x fa-fw text-blue" } icon={ faFrown } /> </h3>
      }
      <p>{ mainMessage }</p>
      { alternativeMessage &&
      	<div>
	      <hr />
	      <p className="mb-0">{ alternativeMessage }</p>
	    </div>
	  }
    </div>
    )

}

AlertMessage.propTypes = {
	alertType: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
	mainMessage: PropTypes.string.isRequired,
	alternativeMessage: PropTypes.string
}