//Checkea si hay algun item en el carrito
const revisarCarrito=()=>{
    let carrito=[];
    if(localStorage.getItem("Carrito del cliente")){
        carrito=JSON.parse(localStorage.getItem("Carrito del cliente"));
    }
    return carrito;
}
//Boton vaciar
let carritoCapturar=revisarCarrito();
let eliminar=document.getElementsByClassName("eliminarBotonContainer");
$(".eliminarBotonContainer").append(`<button class='eliminarBoton' id='botonVaciar'>Vaciar carrito</button>`);
//
const renderizarCarrito=()=>{
    for(producto of carritoCapturar){
       $("#container__carrito").append(
        `<div class='card--carrito'>
           <img src='${producto.imagen}' class="card__imagen">
           <div class="card__body">
                <div class="card__title">
                    <h3>'${producto.marca} ${producto.modelo}'</h3>
                </div>
                    <div class="card__precio">
                <h3>${producto.precio}</h3>
                    </div>  
            <button href="#" class="eliminarBotonContainer" onclick="quitar('${producto.id}')">Quitar</button>                 
            </div>
        </div>`) 
    }
}
renderizarCarrito();
//Funcion quitar 
function quitar(id){
let productoQuitar=carritoCapturar.find(producto=>producto.id==id);
let indiceProducto=carritoCapturar.indexOf(productoQuitar);
carritoCapturar.splice(indiceProducto,1);
localStorage.setItem("Carrito del cliente",JSON.stringify(carritoCapturar));
location.reload();
}
$("#botonVaciar").click(()=>{localStorage.clear();location.reload()});