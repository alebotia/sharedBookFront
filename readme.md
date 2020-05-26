# Shared books

Aplicacion para la administracion de mis libros, en un futuro hacer modulo de usuarios:

## javascript 

### formatear fecha a un string 

para formatear una fecha a un string requerido se puede hacer con el metodo de la clase Date **toLocaleDateString**, este metodo recibe como parametro un local-specific y las opciones, ejemplos en la pagina de mozilla.

Node Js tiene un bug con los local ya que solo tiene *en-US* que da la fecha en formato mes/dia/año, si se quiere utilizar otro local como el de gran bretaña *en-GB*, se debe instalar una libreria llamada full-icu **npm install -s full-icu**, para que node tome los locals globalmente se debe modificar la linea de arranque de la aplicacion

```js
For package.json:
{"scripts":{"start":"node --icu-data-dir=node_modules\\full-icu YOURAPP.js"}}
```

En el siguiente ejemplo se ve como se modifican todas las fechas de un arreglo de documentos

```js


// backend user controller metodo getUsers
    users = users.map((user, index) => {      
      let date = new Date(user.dob)
      let dobDate = date.toLocaleDateString('en-GB')
      return {
        name: user.name,
        surname: user.surname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        documentNumber: user.documentNumber,
        dob: dobDate }
    })
```

### Acceder programaticamente a llave dentro de objeto

Se pueden acceder a las llaves de un objeto utilizando dot notation o bracket notation, cuando se quiere accerder con una variable se debe hacer con bracket notation asi 

```Javascript
var foo = 'bar';
something[foo];
```

### milisegundos a dias 

```Javascript
Date.daysBetween = function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}
```

### spread document

cuando se encuentran tres puntos antes de un documento lo que se hace es expandirlo, es util cuando se tienen que pasar parametros a una funcion, simplemente se encapsulan los parametros en un objeto, se pasa a la funcion y alli se utilizan los tres puntos **ejemplo en la creacion de usuarios**

### fuentes para consumir servicios

https://reqres.in/

https://jsonplaceholder.typicode.com/

### Verificar si una variable es nula o indefinida. [Tomado de](https://www.tutorialrepublic.com/faq/how-to-determine-if-variable-is-undefined-or-null-in-javascript.php) 

```Javascript
    console.log(null == undefined)  // Print: true    
    console.log(null === undefined) // Print: false
    
    /* Since null == undefined is true, the following statements will catch both null and undefined */
    if(firstName == null){
        alert('Variable "firstName" is undefined.');
    }   
```

### bajar arreglo a minusculas y quitar espacios en blanco 

```Javascript
  let authorArray = params.authors.split(',')
  let authorTrimedArray = [];
  let i;
  for (i = 0; i < authorArray.length; i++){
    authorTrimedArray.push(authorArray[i].trim().toLowerCase());
  } 
```

### letra a mayuscula

```Javascript
export const firstLetterUpper = (text) => { 
  let temp = text.toString().toLowerCase(); 
  return temp.charAt(0).toUpperCase() + temp.slice(1);
}
```

### operador condicional ternario y evaluacion boolena

se pueden utilizar condicionales para el renderizar un componente

1. **evaluacion terciaria**: responde al tipo condición ? expresión1 : expresión2; Ejemplo

```js
<label> { authors.length > 1 ? `Autores: ${authors.join(', ')}` : `Autor: ${authors.join(', ')}` } </label>
```
2. **evalucacion booleana:** util para validar una si un valor existe y renderizar ejemplo:

```js
{ totalItems && <Pagination 
                        totalRecords={totalItems}
                        currentPage={currentPage}
                        pageLimit={10}
                        totalPages={totalPages}
                        pageNeighbours={1}
                        onPageChanged={this.onPageChanged} />
        }
```

exportar/importar constantes 

### funcion para capturar la tecla enter
```js
enterPressed = evt => {
    var code = evt.keyCode || evt.which;
    if(code === 13) { //13 is the enter keycode
    const documentNumber = this.state.userDocument;
      this.onValidateUser({ documentNumber });
    } 
}
```

## agregar bootstrap en la app 

npm install bootstrap -s

agregar el siguiente import en el archivo index.js

```js
import "bootstrap/dist/css/bootstrap.min.css";
```

ya se puede utilizar bootstrap normal en toda la app, dentro de cualquier jsx

por ejemplo

```html
<div className="col-sm-6 col-md-4 country-card">
```

### documentacion 

+ [cards](https://getbootstrap.com/docs/4.0/components/card/)
+ [texto](https://getbootstrap.com/docs/4.0/utilities/text/ )
+ [colores](https://getbootstrap.com/docs/4.0/utilities/colors/)
+ [espaciado](https://getbootstrap.com/docs/4.4/utilities/spacing/)
+ layout/grid
+ examples

### box model 

https://www.htmldog.com/guides/css/beginner/margins/

### importar hoja de estilos en un componente 

cuando sea necesario traer una hoja de estilos se puede traer directamente desde el componente

```js
import '../assets/styles/LoginUtil.css';
```

## .env 

configuracion ambiente de trabajo desde un archivo de trabajo, para trabajar con create-react-app se debe

1. crear el archivo por fuera del directorio src
2. las varias deben tener el prefijo **REACT_APP_**

es preferible dejar todo lo que sea "hard codeado" en una variable del archivo de configuracion, en el momento que cambia de ambiente es mas facil ir a un solo lugar 

poner la line **require('dotenv').config();** lo antes posible en el proyecto, en este caso es en el index.js

## Font Awesome 

ver por su sitio en github para mas informacion [github](https://github.com/FortAwesome/react-fontawesome)

dentro de la carpeta **free-brands-svg-icons** se encuentran las marcas conocidas 
dentro de la carpeta **free-solid-svg-icons** se encuentran iconos normales 

para buscar un item se hace en [esta pagina](https://fontawesome.com/icons?d=gallery)

para usarlo se antepone fa en el nombre y se utiliza pascal case, por ejemplo **faHouseUser**

```javascript
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

<FontAwesomeIcon className="fa" icon={faSearch} /> 
```

## Font Mfizz

Cuando font awesome no tiene los logos que se buscan se puede utilizar esta libreria que tambien soporta graficos 

aca se encuentra el de aws mongo hadoop, son mas especificos a tecnologia

## Componentes

## Definir componentes  

los nombres de los componentes deben ser en mayuscula siguiendo notacion PascalCase

Siguiendo el patron de diseño de container, en react existen dos tipos de componentes:

1. Dumb components: son componentes de presentacion. Estan definidos por funciones. No pueden tener estados, su tarea es recibir propiedad y mostrarlas al usuario. Definicion de este componente.

```javascript
import React from 'react';

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
```

2. Smart Componentes: son componentes containers. Estan definidos por clases. Puden tener estados y su tarea es mantener un track de ellos para ser pasados a los componentes de presentacion.  Definicion de este componente.

``` javascript
import React, {Component} from 'react';

class App extends Component {
  render () {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
``` 

## funciones del ciclo de vida 

el ciclo de vida de un componete es de tres etapas, cada etapa tiene sus metodos par controlar las acciones que se deben realizar 

1. montaje
2. actualizacion
3. desmontaje

los metodos mas importantes son 

1. constructor -> este metodo se invoca una sola vez y no puede tener la palabra clave async/await. es el metodo que se llama cuando se va a inicializar el componente, aqui se definen los propiedades basicas y se instancias las props que vienen del componente. un constructor basico tiene la siguiente forma: 
```javascript
constructor(props){
  super(props)
}

``` 

2. componentDidMount -> este metodo se invoca una sola vez. se hace para realizar llamados a una api una vez que el componente se a montado en la pantalla. se puese llamar el metodo setState para actualizar estados, con el favor que renderizara de nuevo, sin embargo el usuario no notara el cambio. Ejemplo en el componente **BorrowBook**

3. render -> se ejecuta cada vez que hay un cambio en el estado o en las props, en este metodo se define el JSX que va a renderizar la pagina, es el unico evento obligatorio debe ser puro. se ejecuta cuando se monta y cuando se actualiza

4. componentDidUpdate(prevProps) -> verifica que las propiedades han cambiado, se ejecuta cada vez que haya un cambio de propiedades, es util para hacer llamadas a una API cada vez que una propiedad cambia. Se debe controlar que solo se ejecute cuando cierta condicion ha cambiado para abolir un ciclo infinito de llamadas, se puede llamar al metodo setState para modificar estados y renderizar la pagina EJEMPLO en el componente **ReturnBookModal**

```javascript

// ejemplo del componente ReturnBookModal
async componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if ( this.props.title !== prevProps.title ){
    console.log('current props ', this.props.title)
    console.log('previous props ', prevProps.title)
  }

}
```

### Manejo de eventos 
React maneja los eventos que suceden en el ambito de la aplicacion como cuando se pulsa una tecla o cuando se da click en algun boton, ademas en los inputs se manejan estados para ir controlando los eventos, ejemplos de esta implementacion se encuentra en el **componente SearchBox**

### PropTypes

es util para realizar el checkeo del tipo de dato que se espera de la propiedad y si es obligatoria u opcional. 

prop-types es una libreria independiente de react instalar por medio de npm: **npm install -s prop-types**

Referencia de las posibles [prop types](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes) 

Definicion: Esta definicion se puede usar en dumb components como en smart components nombre del componente.propTypes{ propiedad: PropTypes.tipo.obligatoriedad}

``` javascript
import PropTypes from 'prop-types'

title, authors, genres, numberOfCopies, identifier

PrintBooks.propTypes = {
	title :  PropTypes.string.isRequired,
	authors :  PropTypes.array.isRequired,
	genres :  PropTypes.array.isRequired,
	numberOfCopies :  PropTypes.number.isRequired,
	identifier :  PropTypes.string.isRequired,
  onHandleChange :  PropTypes.func.isRequired,
  alertType: PropTypes.oneOf(['success', 'error']).isRequired,
}
```
### asignar proptype por defecto
``` javascript

Pagination.defaultProps = { currentPage:1 }

```

### pasar funciones como proptype 

cuando un componente hijo necesita operar sobre algun estado/elemento del padre o cuando se necesita un event handler en el caso de botones o listas, el padre debe enviarle una funcion. La funcion puede ser activada desde el hijo, en el caso de los event handlers solo se debe enviar la referencia

ejemplos 

funcion onLogoutTry va desde App -> Home -> Navbar

funcion onPageChanged va de Home -> Pagination y es disparada desde alli 

## axios 

par hacer la llamada a la API utilizar axios, esta utilidad devuelve las peticiones en formato JSON 

en la respuesta, la llave **data** se encuentran los campos retornados, la llave **status** retorna el error 

cuando se tienen que enviar fechas se tienen que enviar como strings, los objetos de la clase Date tienen un metodo llamado **.toISOString()** este objeto lo recibe moongose y lo procesa, si se necesitan hacer operaciones antes se puede tomar el string y convertir nuevamente a fecha de la siguiente forma **const dateInServer = new Date(req.query.date);**

para enviar informacion en el body con post se debe utilizar la libreria **query-string**, la peticion se hace de la siguiente forma 

```javascript
  let url = `${apiEndPoint}/login`
  
  const data= {
      email: email,
      password: password,
      gethash: true
    }

  try {
      let res = await axios.post(url, qs.stringify(data))
      console.log('the user is logged correctly ', res.data.token)
  }catch (error){
      console.warn("couldn't log the user, server respons is: ", error.response.data.message)
  }

```

cuando se quier controlar el error de una peticion se maneja un try catch, el objeto error contiene los objetos igual que el objeto al que se le quiere asignar la informacion

```javascript
  try {
    apiRes = await axios.get('https://silex.edgeprop.my/api/v1/a');
  } catch (err) {
    console.error("Error response:");
    console.error(err.response.data);    // ***
    console.error(err.response.status);  // ***
    console.error(err.response.headers); // ***
  } 
```

para obtener la configuracion de la peticion que se quiere enviar utilizando postman abajo del boton **send** hay una opcion para obtener el codigo, seleccionar el de ajax, la opcion **"Content-Type": "application/x-www-form-urlencoded"** no es necesario dado que es la que tiene por defecto

## paginacion

ejemplo de la paginacion en [digitalocean](https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react)

## sidebar menu

ejemplo de [side bar menu en bootsrtrap](https://bootsnipp.com/snippets/Q0dAX) de este ejemplo saque la idea del **toggle menu**

el side bar maneja estados para ver cual fue el menu abierto y cual fue el item seleccionado 

el efecto de aparecer y desaparecer lo tome de [aqui](https://github.com/vutran/react-offcanvas)

## modal 
segui el ejemplo de esta [pagina](https://www.digitalocean.com/community/tutorials/react-modal-component)

el componente modal tiene un bug en bootstrap cuando se instala por npm, para abolirlo nombrar la clase de otra forma y adicionar los estilos por separado

## manejo de fechas

se puede hacer un datepicker con el paquete react-datepicker 

para pasar un objeto fecha por axios se debe convertir a string primero, el objeto fecha tiene un metodo llamado **toISOString()** utilizarlo 


las fechas se pueden generar con la clase Date de javascript, el constructor de las fechas recibe parametros para definir la fecha que uno quiere 

```javascript
dob: this.state.dobDate.toISOString()
new Date(year, month, day, hours, minutes, seconds, milliseconds)
```
moongose hace el parsing de las fechas de forma automatica cuando se a utilizado el toISOstring antes

en el helper se encuentran metodos para adicionar una cantidad de dias a una fecha

si se quiere pasar del string de la fecha a objeto Date se hace 

```javascript
const dateInServer = newDate(req.query.date);
```
### react-datepicker

es una libreria que provee la facilidad de escoger fechas dentro de react, retorna valores del objeto Date de javascript, tiene un problema al modificar sus estilos, para ello se debe adicionar en un css la siguiente linea y poner los estilos ahi 

```
.react-datepicker-wrapper,
.react-datepicker__input-container,
.react-datepicker__input-container input {
    display: block;
    width: 100%;
}
```


### quotes on bootstrap

https://jsfiddle.net/bootstrapious/7fyne8jp

 <!-- CUSTOM BLOCKQUOTE -->
                <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded">
                    <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                    <p class="mb-0 mt-2 font-italic">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo <a href="#" class="text-info">@consequat</a>."</p>
                    <footer class="blockquote-footer pt-4 mt-4 border-top">Someone famous in
                        <cite title="Source Title">Source Title</cite>
                    </footer>
                </blockquote><!-- END -->


                /*
