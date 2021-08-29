// // Obtiene el producto deseado y en cuantas cuotas se quiere pagar
// let productoSeleccionado=prompt("Seleccione el producto que desea (Disponibles: RTX 3090, RTX 2090, Intel I7)")
//  let cuotas=parseInt(prompt("Ingrese la cantidad de cuotas en las que desea pagar"))
//   function obtenerPrecio(producto){
//       let precio;
//     switch(producto){
//      case "RTX 3090":precio=300000;
//          break;
//       case "Intel I7":precio=75000;
//          break;
//      case "RTX 2090": precio=200000;
//         break;
//       default: alert("Este producto no esta disponible");
//          break;
//       }
//       return precio;
//   }
//  //Devuelve el precio de cada cuota
//   function obtenerCuotas(precio,cuotas){
//      let precioCuotas=precio/cuotas;
//         return precioCuotas;
//  }
//  let precioProducto=obtenerPrecio(productoSeleccionado);
//  let precioPorCuota=obtenerCuotas(precioProducto, cuotas);
//  alert("El precio del producto seria:"+" "+precioProducto+" "+"A pagar en" +" " +cuotas+" "+"cuotas de"+" "+precioPorCuota)



//Array de productos
const productos=[
    {id:1, producto:"Placa de video",marca:"NVIDIA",modelo:"RTX 3090",precio:300000,imagen:"../images/RTX3090.jpg"},
    {id:2, producto:"Procesador", marca:"Intel", modelo:"I7",precio:75000,imagen:"../images/inteli7.jpg"},
    {id:3, producto:"Placa de video",marca:"NVIDIA",modelo:"RTX 2060", precio:200000,imagen:"../images/rtx2060.jpg"},
    {id:4, producto:"Placa de video",marca:"AMD",modelo:"RX 580X",precio:120000,imagen:"../images/RadeonRX580.jpg"},
    {id:5, producto:"Memoria RAM",marca:"HyperX",modelo:"Fury",precio:6000,imagen:"../images/hyperxfury.jpg"}
]

let seccion=document.getElementById("container__productos");
for (const producto of productos){
     let seccionProductos=document.createElement("div");
     seccionProductos.setAttribute("class","productos")
     seccionProductos.innerHTML=`<img src="${producto.imagen}" class="productos__imagenes" alt="productos computacion">
                                 <h3 class="titulo__producto">${producto.marca} ${producto.modelo}</h3>
                                 <p class="producto--texto">Precio $:${producto.precio}</p>`;
     seccion.appendChild(seccionProductos);
 }