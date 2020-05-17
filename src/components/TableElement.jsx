import React from 'react'
import PropTypes from 'prop-types'

// valida si la propiedad dateDifference es numero y menor a 0, en cuyo caso coloca la fila en rojo

export default function TableElement({ data, dataOrder, RowType, onClick, onClickLabel}){
	 const tRowClass = (typeof(data['dateDifference']) === 'number' &&  data['dateDifference'] <= 0) 
	 					? "table-danger"
	 					: ""
	// valida si se solicita header or td
	return(
		<tr className= { tRowClass }>
		{ RowType === 'th' ? dataOrder.map((column, index) => {
				// console.log('th column is ', data[column])
				return <th scope="col" key={ index }> { data[column] } </th>
			})
							 : dataOrder.map((column, index) => {
				return (column === 'dateDifference' && data['dateDifference'] <= 0) 
													? <td className="bg-danger" key={ index }> { data[column] }  </td> 
													: <td key={ index }> { data[column] }  </td> 
			})
		}

		{onClick !== undefined && <td> <button className = "btn btn-info active"  onClick={ onClick }> { onClickLabel } </button> </td>}

		</tr>
	)
}

TableElement.propTypes = {
	data:  PropTypes.object,
	dataOrder: PropTypes.array.isRequired,
	RowType: PropTypes.oneOf(['th', 'td']).isRequired,
	onClick: PropTypes.func,
	onClickLabel: PropTypes.string
}

