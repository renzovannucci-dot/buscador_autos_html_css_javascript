//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado'); //seleccionamos el div con id #resultado, ahi se mostrarán los resultados de la busqueda

const max = new Date().getFullYear();
const min = max - 10;

//3-Generamos un objeto para ver los elementos que selecciona el usuario, con lso parametros que vamos a buscar

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//Eventos

document.addEventListener('DOMContentLoaded', () => {
    //Una vez que cargue el html mandamos a llamar la función mostrar autos
    mostrarAutos(autos); //muestra los autos al cargar

    //Llena las opciones de años
    llenarSelect();

})

//Event listener que esuchan por los formularios
marca.addEventListener('change', e => {
    //Lo agregamos al objeto que estamos llenando
    datosBusqueda.marca = e.target.value; //guardo el que selecciono

    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value; //guardo el que selecciono

    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value; //guardo el que selecciono

    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value; //guardo el que selecciono

    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value); //guardo el que selecciono

    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value; //guardo el que selecciono

    
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value; //guardo el que selecciono

    
    filtrarAuto();
});


//Funciones
//1-Esta funcion crea un html con los autos 
function mostrarAutos(autos) {

    limpiarHTML();//elimina el html previo de las busquedas

    //recorremos el arreglo de autos y creamos un html por cada objeto
    autos.forEach(auto => {
        const autoHTML = document.createElement('p');

        //Aplicamos destructuring
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}  

        `;

        //Isertamos en el div #resultado dentro del html
        resultado.appendChild(autoHTML);
    });
}

//6- funcion que limpia html

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

//2-Funcion que genera los años del select

function llenarSelect() {
    for (let i = max; i >= min; i--) {
       const opcion = document.createElement('option');
       opcion.value = i;
       opcion.textContent = i;
       year.appendChild(opcion); //agrega las opciones de año al select
    }
}

//3-Funcion que filtra en base a la busqueda

function filtrarAuto() {
    //usamos un array method filter
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas)
    .filter(filtrarTransmision).filter(filtrarColor); //pasamos la funcion como parametro

    
   //SI no encuentra nada, mostramos un mensaje en el html que no hay resultados
   if(resultado.length) {
        //Llamamos a la funcion mostrar autos, esta vez con el resultado de los filtrados como parametro
        mostrarAutos(resultado);
        // console.log(resultado);

    } else {
        noResultado();
    }
}

function noResultado() {

    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
}


//4-Funcion que filtra solamente por marca
function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if(marca) {
        return auto.marca === marca;
    } 
    //si no seleccione nada me retorna el auto completo para mantener la referencia
    return auto;
}

//5-Funcion que filtra solo el año
function filtrarYear(auto) {
    const {year} = datosBusqueda;

    if(year) {
        return auto.year === parseInt(year);
    } 
    //si no seleccione nada me retorna el auto completo para mantener la referencia
    return auto;
}

//6-Funcion que filtra el minimo

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;

    if(minimo) {
        return auto.precio >= minimo;
    } 
    //si no seleccione nada me retorna el auto completo para mantener la referencia
    return auto;
}

//7-Funcion que filtra el maximo

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;

    if(maximo) {
        return auto.precio <= maximo;
    } 
    //si no seleccione nada me retorna el auto completo para mantener la referencia
    return auto;
}

//8-Filtrar puertas

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;

    if(puertas) {
        return auto.puertas === puertas;
    } 
    //si no seleccione nada me retorna el auto completo para mantener la referencia
    return auto;
}

//9-Filtrar transmision

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;

    if(transmision) {
        return auto.transmision === transmision;
    } 
    //si no seleccione nada me retorna el auto completo para mantener la referencia
    return auto;
}

//10-Filtrar color

function filtrarColor(auto) {
    const {color} = datosBusqueda;

    if(color) {
        return auto.color === color;
    } 
    //si no seleccione nada me retorna el auto completo para mantener la referencia
    return auto;
}

