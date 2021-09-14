$(document).ready( ()=>{
    //Llamada a la funcion
   renderizarProductos(productos);
   contador();
   renderizarCarrito();
   revisarCarrito();
});
//Array de productos
const productos=[
    {id:1, producto:"Placa de video",marca:"NVIDIA",modelo:"RTX 3090",precio:300000,imagen:"../images/RTX3090.jpg"},
    {id:2, producto:"Procesador", marca:"Intel", modelo:"I7",precio:75000,imagen:"../images/inteli7.jpg"},
    {id:3, producto:"Placa de video",marca:"NVIDIA",modelo:"RTX 2060", precio:200000,imagen:"../images/rtx2060.jpg"},
    {id:4, producto:"Placa de video",marca:"AMD",modelo:"RX 580X",precio:120000,imagen:"../images/RadeonRX580.jpg"},
    {id:5, producto:"Memoria RAM",marca:"HyperX",modelo:"Fury",precio:6000,imagen:"../images/hyperxfury.jpg"}
]
//Llamando a AJAX
const URLGET = "https://api-dolar-argentina.herokuapp.com/api/dolaroficial";
$.get(URLGET,function(respuesta,estado){
if(estado==="success"){
    let valor = (respuesta);
    console.log("respuesta"+" "+valor.venta)
    for(const producto of productos){
       let valorUSD= producto.precio/valor.venta;
       console.log(valorUSD);
       $(`.producto--texto${producto.id}`).append(`<p>Precio en USD= ${valorUSD.toFixed()}$</p>`) 
    }
}
})
//Procesando Productos
let seccion=document.getElementById("container__productos");
const renderizarProductos=()=>{
    seccion.innerHTML="";
for (const producto of productos){
     let seccionProductos=document.createElement("div");
     seccionProductos.setAttribute("class","productos")
     seccionProductos.innerHTML=`<img src="${producto.imagen}" class="productos__imagenes" alt="productos computacion">
                                 <h3 class="titulo__producto">${producto.marca} ${producto.modelo}</h3>
                                 <p class="producto--texto${producto.id}">Precio $:${producto.precio}</p>
                                 <button class="carrito__boton" id="boton${producto.id}" type="button">Agregar al carrito</button>`;
     seccion.appendChild(seccionProductos);
     let boton=document.getElementById(`boton${producto.id}`)
     boton.addEventListener("click",agregarCarrito);
     function agregarCarrito(){
        const arrayCarrito=localStorage.getItem("Carrito del cliente") ? JSON.parse(localStorage.getItem("Carrito del cliente")) : [];
        let productoSeleccionado= productos.find(e=> e.id == producto.id);
        arrayCarrito.push(productoSeleccionado);
        console.log(arrayCarrito);
        localStorage.setItem("Carrito del cliente",JSON.stringify(arrayCarrito));
        contador();
        
    }
 }
}

//Ocultar y mostar filtros de busqueda
 function filtroDesplegable(nombre,visibilidad){
    let desplegable=document.getElementById(nombre);
    if (visibilidad===false){
        if(desplegable.classList.contains("oculto")){//Si desplegable contiene una clase con nombre oculto la borra y agrega una con nombre visible
            desplegable.classList.remove("oculto")
        }
        desplegable.className +="visible"//Agrega la clase al final de la lista de clases del html
    }else{
        if(desplegable.classList.contains("visible")){//Si desplegable contiene una clase con nombre visible la borra y agrega una con nombre oculto
            desplegable.classList.remove("visible")
        }
        desplegable.classList +="oculto"//Agrega la clase al final de la lista de clases del html
    }
}
//Evento click para hacer aparecer el desplegable
let botonDesplegable=document.getElementById("agregarFiltros");
let desplegableVisible=false;
botonDesplegable.onclick=()=>{
    filtroDesplegable("aside__seleccion",desplegableVisible)//Agrega valores a los parametros
    desplegableVisible=!desplegableVisible;//Si era false ahora es true y si era true ahora es false
}
//Filtros desplegables
$("#aside__seleccion").on("change", (e)=>{
    if(e.target.value=="menor"){
        const productosOrdenadosMenor = productos.sort((a, b)=> a.precio - b.precio);     
        renderizarProductos(productosOrdenadosMenor);        
    }else if(e.target.value=="mayor"){
        const productosOrdenadosMayor = productos.sort((a,b)=> b.precio - a.precio);
        renderizarProductos(productosOrdenadosMayor);
    }else if(e.target.value=="alfabetico"){        
        const productosOrdenadosAlfabetico = productos.sort((a,b)=>{
            if (a.modelo > b.modelo) {
                return 1;
            }else if (a.modelo < b.modelo) {
                return -1;
            }else              // a must be equal to b
              return 0;
            });        
        renderizarProductos(productosOrdenadosAlfabetico);
    }
})