$(document).ready(()=>{
    renderizarCompra;
})
//Array de productos
const productos=[
    {id:1, producto:"Placa de video",marca:"NVIDIA",modelo:"RTX 3090",precio:300000,imagen:"../images/RTX3090.jpg"},
    {id:2, producto:"Procesador", marca:"Intel", modelo:"I7",precio:75000,imagen:"../images/inteli7.jpg"},
    {id:3, producto:"Placa de video",marca:"NVIDIA",modelo:"RTX 2060", precio:200000,imagen:"../images/rtx2060.jpg"},
    {id:4, producto:"Placa de video",marca:"AMD",modelo:"RX 580X",precio:120000,imagen:"../images/RadeonRX580.jpg"},
    {id:5, producto:"Memoria RAM",marca:"HyperX",modelo:"Fury",precio:6000,imagen:"../images/hyperxfury.jpg"}
]
//Checkea si hay algun item en el carrito
const revisarCarrito=()=>{
    let carrito=[];
    if(localStorage.getItem("Carrito del cliente")){
        carrito=JSON.parse(localStorage.getItem("Carrito del cliente"));
    }
    return carrito;
}
//Funcion vaciar carrito
const vaciarCarrito =()=>{
    localStorage.clear();
}
//Renderiza los productos seleccionados
const renderizarCompra=()=>{
    let carritoCapturar=revisarCarrito();
    $("#productosSeleccionados").html("");
    for(producto of carritoCapturar){
        $("#productosSeleccionados").append(`
                        <div class="containerSeleccion">
                        <h4 id="productoSeleccion">${producto.marca} ${producto.modelo}</h4>
                        <p id="precioSeleccion">$${producto.precio}</p>
                        <img id="imagenSeleccion" src="${producto.imagen}">
                        </div>
                                    `)
    }
}
//Llamado a la funcion
renderizarCompra();
//Renderizar formulario
const renderizarFormulario=()=>{
    $("#formularioCompra").append(`
                <h3 id="tituloDatos">Datos personales</h3>
        <form id="formulario" action="">
    <div id="containerDatos">
    <input id="nombre" value="Bruno" class="inputsFormulario" type="text" placeholder="Nombre"><br>
    <input id="apellido" value="Malagoli" class="inputsFormulario" type="text" placeholder="Apellido"><br>
    <input id="mail" value="bmalagoli2@gmail.com" class="inputsFormulario" type="email" placeholder="Correo electronico"><br>
    <input id="direccion" value="Av.San Martin 2500" type="text" class="inputsFormulario" placeholder="Direccion"><br>
    <input id="codigoPostal" value="1416" type="text" class="inputsFormulario" placeholder="Cod.Postal" required>
    </div>
                <h3 id="tituloDatosPago">Datos de facturacion</h3>
            <div id="containerTarjeta">
        <div id="containerTarjetaDatos">
    <input id="numTarjeta" class="inputsTarjeta" type="text" placeholder="Numero de la tarjeta"><br>
    <input id="nombreTarjeta" class="inputsTarjeta" type="text" placeholder="Nombre y apellido del titular"><br>
    <input id="codigoTarjeta" class="inputsTarjeta" type="text" placeholder="Codigo de seguridad">
    <input id="emisionTarjeta" class="inputsTarjetaDates" type="month" placeholder="Fecha de emision">
    <input id="vencimientoTarjeta" class="inputsTarjetaDates" type="month" placeholder="Fecha de vencimiento">
    <span id="tagEmision">Fecha emision</span>
    <span id="tagVencimiento">Fecha vencimiento</span>
        </div>
            </div>
            <button type="submit" id="botonComprar">Comprar</button>    
        </form>
    `)
}
//Llamada a funcion renderizar Formulario
renderizarFormulario();
//Evento click boton comprar
$("#botonComprar").click((event)=>{
    event.preventDefault();
 Swal.fire({
    icon: 'success',
    title: 'Compra exitosa!!',
    text: 'Muchisimas gracias por la confianza, su pedido esta en camino!',
    allowOutsideClick: false,
    showConfirmButton: false,
    html:"<button id='botonVolverTienda'><a href='../pages/productos.html'>Volver a la tienda</a></button>"
  })
vaciarCarrito();
})