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
           <div class="card__body">
           <img src='${producto.imagen}' class="card__imagen">
                <div class="card__title">
                    <h3>${producto.marca} ${producto.modelo}</h3>
                </div>
                    <div class="card__precio">
                <h3>$ ${producto.precio}</h3>
                    </div>  
            <button href="#" class="eliminarBotonContainer" onclick="quitar('${producto.id}')"><i class="fas fa-trash-alt"></i></button>                 
            </div>
        </div>
        </section>
        `)
    }
}
//Renderiza los botones de adentro del carrito
const renderizarBotones=()=>{
    $("#containerCarrito").append(`<div id='containerBotonesCarrito'><button class='eliminarBoton' id='botonVaciar'>Vaciar carrito</button>
                                    <button class="botonInvalido" id='continuarBoton'><a id="textoContinuar" href="../pages/finalizarCompra.html">Continuar compra</a></button></div>`)
    //Pop-up confirmar vaciar carrito
    $("#botonVaciar").click(avisoVaciarCarrito=()=>{
        Swal.fire({
        title: 'Quieres vaciar tu carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        reverseButtons: true
        }).then((result) => {
         if (result.isConfirmed) {
         vaciarCarrito();
          }
            })
                })}
//Funcion vaciar carrito
const vaciarCarrito =()=>{
    localStorage.clear();
    location.reload();
}
//Agrega un texto adentro del carrito si el mismo esta vacio
const carritoVacio=()=>{
    $("#containerCarrito").html("");
    $("#containerCarrito").append(`<p class="textoCarritoVacio">Agrega productos a tu carrito!</p>`)
}
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
    //Funcion if para que si el carrito esta vacio muestre el mensaje y en caso de tener un item lo renderice
    let carritoCapturar=revisarCarrito();
    if(carritoCapturar.length==0){
        carritoVacio();
        renderizarBotones();
        $("#continuarBoton").remove();
        $("textoContinuar").remove();
    }else{
            renderizarCarrito();
            renderizarBotones();
        }
    $("#containerCarrito").slideToggle();
});