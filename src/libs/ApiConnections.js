import axios from "axios";
import { getItem, saveItem, dropItem } from './LocalStorage'
const qs = require('querystring');  
// to get the configuration of the http request in postman
// go below the send button to the code option, and select the JavaScript - jQuery
// in axios the first parameter is the URL, the second parameter is a config file axios.get(url[, config])

const apiEndPoint = process.env.REACT_APP_API_ENDPOINT

export async function login(email, password){
    let url = `${apiEndPoint}/login`    
    const data= {
        email: email,
        password: password,
        gethash: true
      }

    let response = false;
    let responseCode = 0;
    let role = ''
    try {
        let res = await axios.post(url, qs.stringify(data))
        saveItem('auth', res.data.token)
        saveItem('userRole', res.data.role)
        role = res.data.role;
        responseCode = res.status
        response = true;
    }catch (error){
        console.warn("couldn't log the user, server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        responseCode = error.response.status        
    }

    return ({ responseCode, response, role})
}

export async function getBooksPerPage ( page, itemsPerPage, word = '') {
    let url = `${apiEndPoint}/books/${page}/${itemsPerPage}/${word}` 
    let settings = {
      "timeout": 0,
      "headers": {
        "Authorization": getItem('auth')
      },
    };
    console.log('url request ', url)
    let res = await axios.get(url, settings);
    // console.log('response: ', res)
    // console.log('result books: ', res.data)
    let data = await {
        totalCount: res.data.totalItems,
        pageCount: res.data.pageCount,
        currentPage: res.data.currentPage,
        perPage: res.data.perPage,
        books: res.data.result
    };
    // console.log("print axios type: ", typeof(data));
    // console.log("data in axios ", data);
    return(data)
}

// validar si un usuario puede sacar un libro 
export async function validateUser ( docNumber, bookId ) {
    if(docNumber === '' || docNumber == undefined ||
       bookId === '' || bookId == undefined ){
        return { response: 'por favor ingrese los valores requeridos para validar el usuario', responseCode: 500}
    }
    let url = `${apiEndPoint}/validateUser/${docNumber}/${bookId}` 
    let settings = {
      "timeout": 0,
      "headers": {
        "Authorization": getItem('auth')
      },
    };
    
    try{
        console.log('Validate user url request ', url)
        let res = await axios.get(url, settings);
        // console.log('response: ', res)
        // console.log('result books: ', res.data)
        return { response: res.data.message, responseCode: res.status, userId: res.data.userId }
    }catch(error){
        console.warn("couldn't validate user, server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        return {response: error.response.data.message, responseCode: error.response.status }
    }
}

// inputFields es un documento con los datos a guardar
// title
// authors
// genres
// numberOfCopies
// location
// idiom
export async function saveBook( inputFields ){
    let url = `${apiEndPoint}/book` 
    let settings = {
      "timeout": 0,
      "headers": {
        "Authorization": getItem('auth')
      }
    };

    let data = { ...inputFields };
    try{
        let res = await axios.post(url, qs.stringify(data), settings);
    if(res.status === 200){
        return {response: res.data.message, responseCode: res.status, success: true}
    }else {
        return {response: res.data.message, responseCode: res.status, success: false}
    }
    }catch (error){
        console.warn("couldn't save book, server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        return {response: error.response.data.message, responseCode: error.response.status, success: false}
    }
}

// inputFields es un documento con los datos a guardar
// el objeto de tipo fecha fue convertido a string,
// en el servidor se debe crear el tipo correspondiente
export async function saveUser( inputFields ){
    let url = `${apiEndPoint}/register` 
    let settings = {
      "timeout": 0,
      "headers": {
        "Authorization": getItem('auth')
      }
    };

    let data = { ...inputFields };
    console.log('data to user', data)
    try{
        let res = await axios.post(url, qs.stringify(data), settings);
        if(res.status === 200){
            return {response: res.data.message, responseCode: res.status, success: true}
        }else {
            return {response: res.data.message, responseCode: res.status, success: false}
        }
    }catch (error){
        console.warn("couldn't save book, server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        return {response: error.response.data.message, responseCode: error.response.status, success: false}
    }
}

// retorna true or false dependiendo si el token 
// que hay en el local storage es valido
export async function isTokenValid(){
    // hay token ? 
    let currentToken = getItem('auth')
    console.log('the currentToken is ', currentToken)
    if (currentToken != undefined){
        let url = `${apiEndPoint}/isTokenValid` 
        let settings = {
          "timeout": 0,
          "headers": {
            "Authorization": currentToken
          },
        };
        try {
            let res = await axios.get(url, settings)
            console.log('verify token: ', res.data.message, res.status)
            if (res.status === 200) {
                // token valido
                return true
            }
    }catch (error){
        // token invalido
        console.warn("token is not valid: ", error.response.data.message)
        dropItem('auth')
        return false;
    }
    }else{
        // no token
        console.log('token no esta definido')
        return false;
    }

}

// cuando un libro se presta, se un nuevo documento dentro del arreglo borrows
// USER: objectId del usuario al que se le presto el libro
// STARTDATE: fecha del dia en el que se  presto el libro
// ENDDATE: fecha que se selecciono para que el libro sea retornado
// ACTIVEBORROW: bandera que indica si el prestamo es o no activo 

// el objeto data que llega como parametro contiene 
// bookId, userId, endDate
// el valor de endDate fue pasado a string antes
export async function borrowBook( inputFields ){
    let url = `${apiEndPoint}/borrow-book` 
    let settings = {
      "timeout": 0,
      "headers": {
        "Authorization": getItem('auth')
      }
    };
    let data = { ...inputFields }
    let res = await axios.post(url, data, settings);
    try{
        if(res.status === 200){
            return{ response: res.data.message, responseCode: res.status, success: true}
        }else{
            return{ response: res.data.message, responseCode: res.status, success: false}
        }
    }catch(error){
        console.warn("couldn't boorow book, server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        return {response: error.response.data.message, responseCode: error.response.status, success: false}
    }
}

// ejemplo de retorno 
// "_id": "5eb5fe44a303cb47c006097f",
// "user": {
//     "_id": "5ea34fe737861e2eb00353e9",
//     "name": "alejandro",
//     "surname": "botia",
//     "documentNumber": 1057600371
// },
// "startDate": "2020-05-09T00:50:12.505Z",
// "endDate": "2020-05-10T00:00:00.000Z",
// "activeBorrow": true
// el parametro es el identificador del libro
export async function getBorrowsByBookId ( _id ){
    let url = `${apiEndPoint}/borrows/${_id}` 
    let settings = {
      "timeout": 0,
      "headers": {
        "Authorization": getItem('auth')
      }
    };

    try {
        let res = await axios.get(url, settings);
        console.log('response active borrows ', res)
        if(res.data.activeBorrows !=  undefined){
            console.log('array of active borrows ', res.data.activeBorrows)
        } 
        return { response: res.data.message, responseCode: res.status, activeBorrows: res.data.activeBorrows }
    }catch(error){
        console.warn("the error  is: ", error)
        console.warn("couldn't boorow book, server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        return {response: error.response.data.message, responseCode: error.response.status, success: false}
    }
}

// metodo para indicar que un libro fue retornado 
// recibe el identificador del libro y el identificador del prestamo
export async function returnBook(BookId, borrowId){
    let url = `${apiEndPoint}/return-book/${BookId}/${borrowId}`
    let settings = {
      "timeout": 0,
      "headers": {
        "Authorization": getItem('auth')
      }
    };

    try {
        let res = await axios.get(url, settings);
        console.log('response return book ', res)
        return { response: res.data.message, responseCode: res.status }
    }catch(error){
        console.warn("the error  is: ", error)
        console.warn("couldn't boorow book, server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        return {response: error.response.data.message, responseCode: error.response.status, success: false}
    }
}

// retorna los 30 prestamos activos con mayor deuda de tiempo
export async function getActiveBorrows( ){
    let url = `${apiEndPoint}/active-borrows`
    let settings = {
      "timeout": 0,
      "headers": {
        "Authorization": getItem('auth')
      }
    };

    try {
        let res = await axios.get(url, settings);
        console.log('response return book ', res)
        return { response: res.data.message, responseCode: res.status, activeBorrows: res.data.activeBorrows }
        // return { response: 'hola', responseCode: 200, activeBorrows: [] }
    }catch(error){
        console.warn("Error in getActiveBorrows: ", error)
        console.warn("couldn't boorow book, server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        return {response: error.response.data.message, responseCode: error.response.status, success: false}
    }
}

// retorna todos los usuarios para listarlos al momento de modificar
export async function getAllUsers(){
    let url = `${apiEndPoint}/users`
    let settings = {
      "timeout": 0,
      "headers": {
        "Authorization": getItem('auth')
      }
    };

    try {
        let res = await axios.get(url, settings);
        console.log('response get all users ', res)
        return { response: res.data.message, responseCode: res.status, users: res.data.users }
        // return { response: 'hola', responseCode: 200, activeBorrows: [] }
    }catch(error){
        console.warn("Error in getActiveBorrows: ", error)
        console.warn("couldn't boorow book, server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        return {response: error.response.data.message, responseCode: error.response.status, success: false}
    }   
}


// los siguientes valores vienen empaquetados en inputFields:
// _id
// name
// surname
// phoneNumber
// dob
export async function updateUser( inputFields ){
    let url = `${apiEndPoint}/update-user` 
    let settings = {
      "timeout": 0,
      "headers": {
        "Authorization": getItem('auth')
      }
    };

    let data = { ...inputFields };
    try{
        let res = await axios.post(url, qs.stringify(data), settings);
        if(res.status === 200){
            return {response: res.data.message, responseCode: res.status, success: true}
        }else {
            return {response: res.data.message, responseCode: res.status, success: false}
        }
    }catch (error){
        console.warn("couldn't update user , server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        return {response: error.response.data.message, responseCode: error.response.status, success: false}
    }
}

// retorna los 30 prestamos activos con mayor deuda de tiempo
export async function getQuote( ){
    let url = `${apiEndPoint}/quote`
    try {
        let res = await axios.get(url);
        console.log('response return book ', res)
        return { response: res.data.message, responseCode: res.status, quote: res.data.quote }
        // return { response: 'hola', responseCode: 200, activeBorrows: [] }
    }catch(error){
        console.warn("Error getting quote: ", error)
        console.warn("couldn't boorow book, server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        return {response: error.response.data.message, responseCode: error.response.status, success: false}
    }
}


// hace una peticion para agendar el libro 
export async function scheduleBook( bookId ){
    let url = `${apiEndPoint}/schedule/${bookId}`
    try {
        let settings = {
          "timeout": 0,
          "headers": {
            "Authorization": getItem('auth')
          }
        };
        let res = await axios.get(url, settings);
        console.log('response scheduleBook book ', res.data.message)
        return { response: res.data.message, responseCode: res.status }
        // return { response: 'hola', responseCode: 200, activeBorrows: [] }
    }catch(error){
        console.warn("Error scheduleBook: ", error)
        console.warn("couldn't boorow book, server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        return {response: error.response.data.message, responseCode: error.response.status, success: false}
    }
}

// retorna los ultimos agendamientos de los usuarios
export async function getActiveSchedules( ){
    let url = `${apiEndPoint}/active-schedule`
    let settings = {
      "timeout": 0,
      "headers": {
        "Authorization": getItem('auth')
      }
    };

    try {
        let res = await axios.get(url, settings);
        console.log('response return book ', res)
        return { response: res.data.message, responseCode: res.status, activeSchedules: res.data.activeSchedules }
        // return { response: 'hola', responseCode: 200, activeSchedules: [] }
    }catch(error){
        console.warn("Error in getActiveSchedules: ", error)
        console.warn("couldn't boorow book, server response is: ", error.response.data.message)
        // retornar false y mostar un texto 
        return {response: error.response.data.message, responseCode: error.response.status, success: false}
    }
}