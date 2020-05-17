// import { getItem } from './LocalStorage'

// Returns the string with the first letter upper case
function firstLetterUpper (text) { 
  let tmp = text.toString().toLowerCase(); 
  return tmp.charAt(0).toUpperCase() + tmp.slice(1);
}

// returns the date now plus N days
// the adition of dates is given by the parameter 
// RETURN_BOOK_WEEKS
function returnBookDate(){
	const retunBookWeek = parseInt(process.env.REACT_APP_RETURN_BOOK_WEEKS_DEFAULT) || 3
	let now = new Date();
	const tmp = now.setDate(now.getDate() + retunBookWeek * 7);
	return new Date(tmp);
}

//given a date, returns the maximum date when the book can be return
function availableReturnDate(){
	const retunBookWeekMax = parseInt(process.env.REACT_APP_RETURN_BOOK_AVAILABLE) || 4
	let now = new Date();
	const tmp = now.setDate(now.getDate() + retunBookWeekMax * 7);
	return new Date(tmp)
}

// retorna el valor que hay almacenado en la constante role del local storage
// function getCurrentRole(){
// 	let value = getItem('userRole')
// 	return value
// }

module.exports = {
	returnBookDate,
	firstLetterUpper,
	availableReturnDate,
	// getCurrentRole,
}