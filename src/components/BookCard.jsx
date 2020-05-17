import React from 'react';
import PropTypes from 'prop-types'

import { firstLetterUpper } from '../libs/Helpers.js'

export default function BookCard({title, authors, genres, 
                                  numberOfCopies, activeBorrowCount,
                                  location, onBorrowBook, onReturnBook,
                                  onScheduleBook, schedule, userRole}) { 
  // console.log('title ', title)
  // console.log('number of copies', numberOfCopies)
  // console.log('number of activeBorrowCount', activeBorrowCount)

  // const { title, identifier } = this.props // solo funciona con clases
  const isAvailable = numberOfCopies - activeBorrowCount > 0 ? true : false
  const isReturn = activeBorrowCount > 0 ? true : false
  const  currentSchedules =  schedule.filter((x) => {
                              if (x.activeSchedule){
                                return x
                              }
                            })
  const usersSchedule = currentSchedules.length

  return (
  <div className="mx-2 my-3 d-flex flex-row p-0 ">
    <div className="h-100 position-relative border-gray px-2 bg-white rounded-left">
      <div className="card h-100" style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title text-capitalize">{firstLetterUpper(title)}</h5>
          <h6 className="card-subtitle mb-2 text-muted text-capitalize"> { authors.length === 1 ? 
                                                           `Autor: ${authors.join(', ')}` : 
                                                           `Autores: ${authors.join(', ')}` } </h6>
          <p className="card-text text-capitalize">{ genres.length === 1 ? 
                                     `Genero: ${genres.join(', ')}` : 
                                     `Generos: ${genres.join(', ')}` }</p>                                                
          <p className="card-text text-capitalize">Numero de ejemplares: { numberOfCopies }</p>
          <p className="card-text text-capitalize">ejemplares disponibles: { numberOfCopies - activeBorrowCount}</p>
          <p className="card-text text-capitalize">Usuarios que quieren leer este libro: { usersSchedule }</p>
          <p className="card-text text-capitalize">Ubicacion: { location }</p>
          </div>
          {userRole === 'ROLE_ADMIN' &&
          <div className="card-footer" style={{ "backgroundColor": "rgba(255, 255, 255, 0)" }}>           

              <button  type="button" disabled= { !isAvailable   }
                       className= {  isAvailable ? "btn btn-primary active" : "btn btn-primary disabled"} 
                       onClick={ onBorrowBook }>Prestar Libro
              </button> 
            
              { isReturn > 0  &&
                 <button  type="button"
                          className= "btn btn-info ml-1" onClick={ onReturnBook }>Retornar Libro
                </button>
              }
            
        </div>
        }
        {userRole === 'ROLE_USER' &&
        <div className="card-footer" style={{ "backgroundColor": "rgba(255, 255, 255, 0)" }}>
              <button  type="button" 
                       className= { "btn btn-primary active" } 
                       onClick={ onScheduleBook }>Quiero Leerlo !!
              </button>             
        </div>
        } 
      </div>
    </div>
  </div>
)
}

BookCard.propTypes = {
    title :  PropTypes.string.isRequired,
    authors :  PropTypes.array.isRequired,
    genres :  PropTypes.array.isRequired,
    numberOfCopies :  PropTypes.number.isRequired,
    activeBorrowCount :  PropTypes.number.isRequired,
    location :  PropTypes.string.isRequired,
    schedule: PropTypes.array.isRequired,
    onBorrowBook: PropTypes.func.isRequired,
    onReturnBook: PropTypes.func.isRequired,
    onScheduleBook: PropTypes.func.isRequired,
    userRole: PropTypes.string.isRequired
}

BookCard.defaultProps = { schedule:[] }