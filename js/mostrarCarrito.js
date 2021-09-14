//Cuenta los items que hay guardados en el carrito
function contador(){
    const contador=document.getElementById("contador");
    contador.innerHTML=localStorage.getItem("Carrito del cliente") ? (JSON.parse(localStorage.getItem("Carrito del cliente"))).length : "0";
}
contador();
//Checkea si hay algun item en el carrito
const revisarCarrito=()=>{
    let carrito=[];
    if(localStorage.getItem("Carrito del cliente")){
        carrito=JSON.parse(localStorage.getItem("Carrito del cliente"));
    }
    return carrito;
}
//Funcion para renderizar el interior del carrito
const renderizarCarrito=()=>{
    let carritoCapturar=revisarCarrito();
    $("#containerCarrito").html("");
    for(producto of carritoCapturar){
       $("#containerCarrito").append(
        `
        <section id='tarjeta__items'>
        <div class='card--carrito'>
           <img src='${producto.imagen}' class="card__imagen">
           <div class="card__body">
                <div class="card__title">
                    <h3>'${producto.marca} ${producto.modelo}'</h3>
                </div>
                    <div class="card__precio">
                <h3>$ ${producto.precio}</h3>
                    </div>  
            <button href="#" class="eliminarBotonContainer" onclick="quitar('${producto.id}')">Quitar</button>                 
            </div>
        </div>
        </section>
        `)
    }
}
//Boton vaciar
$("#containerCarrito").append(`<button class='eliminarBoton' id='botonVaciar'>Vaciar carrito</button>`);
$("#botonVaciar").click(()=>{localStorage.clear();location.reload()});
//Funcion quitar 
function quitar(id){
let carritoCapturar=revisarCarrito();
let productoQuitar=carritoCapturar.find(producto=>producto.id==id);
let indiceProducto=carritoCapturar.indexOf(productoQuitar);
carritoCapturar.splice(indiceProducto,1);
localStorage.setItem("Carrito del cliente",JSON.stringify(carritoCapturar));
$("#tarjeta__items").fadeOut();
$("#containerCarrito").fadeOut();
contador();
}
//Boton carrito
$("#container__carrito").click(function mostrarCarrito(){
    renderizarCarrito();
    $("#containerCarrito").slideToggle();
});