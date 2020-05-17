import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandMiddleFinger } from '@fortawesome/free-solid-svg-icons'

export default function SubMenuItem({ currentOption, icon, label, onClickFunction, optionName }){
	let backgroundColor = currentOption === optionName ? '#c0c5ca' : '#FFFFFF'
	return(
	<li className="list-group-item" style={ { 'backgroundColor': backgroundColor } } >
		<button  type="button" name={ optionName } onClick={ onClickFunction }>
			<FontAwesomeIcon icon={ icon } /> { label }
		</button>
	</li>
	)
}

SubMenuItem.propTypes = {
	currentOption: PropTypes.string.isRequired,
	icon: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	onClickFunction: PropTypes.func.isRequired,
	optionName: PropTypes.string.isRequired
}