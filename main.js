//capturar DOM
let ProductosDiv = document.getElementById("Productos")
let selectOrden = document.getElementById("selectOrden")
let agregarProductoBtn = document.getElementById("guardarProductoBtn")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")

//array con productos en carrito
let productosEnCarrito 
//pensemos el localStorage
if(localStorage.getItem("carrito")){
   //cuando ya existe algo en el storage con la clave carrito
   productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
   //no existe nada en el storage
   productosEnCarrito = []
   localStorage.setItem("carrito", productosEnCarrito)
}


document.addEventListener("DOMContentLoaded", function() {
   let cargarProducto = document.getElementById("cargarProducto");
   let selectOrden = document.getElementById("selectOrden");
   let opcionCargaProducto = document.getElementById("mostrarCargarProducto");
 
   selectOrden.addEventListener("change", function() {
     if (selectOrden.value === "4") {
       cargarProducto.style.display = "block";
       opcionCargaProducto.textContent = "Ocultar Carga de Producto";
     } else {
       cargarProducto.style.display = "none";
       opcionCargaProducto.textContent = "Cargar nuevo Producto";
     }
   });
 
   opcionCargaProducto.addEventListener("click", function() {
     if (cargarProducto.style.display === "none") {
       cargarProducto.style.display = "block";
       opcionCargaProducto.textContent = "Ocultar Carga de Producto";
     } else {
       cargarProducto.style.display = "none";
       opcionCargaProducto.textContent = "Cargar nuevo Producto";
     }
   });

   mostrarCatalogo(mercaderia);
 });
 
////////////
//FUNCTIONS 
///////////

function mostrarCatalogo(array){
   //resetear el DOM
   ProductosDiv.innerHTML = ``
   //Recorrer array para imprimir en el DOM
   for(let Producto of array ){
      let nuevoProductoDiv = document.createElement("div")
      //agregar class
      nuevoProductoDiv.className = "col-12 col-md-6 col-lg-4 my-2"
      nuevoProductoDiv.innerHTML = `<div id="${Producto.id}" class="card" style="width: 18rem;">
                                 <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${Producto.imagen}" alt="${Producto.nombre} de ${Producto.descripcion}">
                                 <div class="card-body">
                                    <h4 class="card-title">${Producto.nombre}</h4>
                                    <p> ${Producto.descripcion}</p>
                                    <p class="${Producto.precio <= 2000 && "ofertaProducto"}">Precio: ${Producto.precio}</p>
                                 <button id="agregarBtn${Producto.id}" class="btn btn-primary"><i class="fas fa-shopping-cart fa-1x"></i></button>
                                 </div>
                              </div>`
      ProductosDiv.appendChild(nuevoProductoDiv)

      let agregarBtn = document.getElementById(`agregarBtn${Producto.id}`)

      agregarBtn.addEventListener("click", () => {
         // console.log(`Se agrego el Producto ${Producto.nombre} al carrito`)
         agregarAlCarrito(Producto)
      })
   }

}

function agregarAlCarrito(Producto){
   //preguntar si existe ese Producto en el array
   let ProductoAgregado = productosEnCarrito.find((elem)=>elem.id == Producto.id) 
   //me devuelve sino encuentra undefined, si encuenta el elemento
   if(ProductoAgregado == undefined){
      //código para sumar al array carrito
      productosEnCarrito.push(Producto)
      localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
      console.log(productosEnCarrito)
   }else{
      //sumar uno a cantidad
      console.log(`El Producto ${Producto.nombre} ya existe en el carrito `)
   }
}

function cargarProductosCarrito(array){
   modalBodyCarrito.innerHTML = ``
   array.forEach((productoCarrito)=>{
      modalBodyCarrito.innerHTML += `
   
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${productoCarrito.nombre}</h4>
                         <p class="card-text">${productoCarrito.descripcion}</p>
                         <p class="card-text">$${productoCarrito.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
      
   `
   })
   calcularTotal(array)
   
}

function calcularTotal(array){
   let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio , 0)
   total == 0 ? precioTotal.innerHTML= `No hay productos en el carrito` : precioTotal.innerHTML = `El total es <strong>${total}</strong>`

}

function ordenarMenorMayor(array){
   //Hace una copia del array original, para aplicar sort y no modificar Mercaderia
   const menorMayor = [].concat(array)
   console.log(menorMayor)
   //ordena en forma ascendente por precio
   menorMayor.sort((a,b) => a.precio - b.precio)
   mostrarCatalogo(menorMayor)
 }
 
 function ordenarMayorMenor(array){
   const mayorMenor = [].concat(array)
   //ordena en forma descendente 
   mayorMenor.sort((elem1 ,elem2) => elem2.precio - elem1.precio)
   mostrarCatalogo(mayorMenor)
 }
 
 function ordenarAlfabeticamentenombre(array){
   const arrayAlfabetico = [].concat(array)
   arrayAlfabetico.sort( (a,b) =>{
      if (a.nombre > b.nombre) {
         return 1
       }
       if (a.nombre < b.nombre) {
         //return explicito
         return -1
       }
       // a must be equal to b
       return 0
   })
 
   mostrarCatalogo(arrayAlfabetico)
 }

function agregarProducto(array){
   let descripcionIngresado = document.getElementById("descripcionInput")
   let nombreIngresado = document.getElementById("nombreInput")
   let precioIngresado = document.getElementById("precioInput")
   
   const ProductoNuevo = new Producto(array.length+1,descripcionIngresado.value, nombreIngresado.value, parseInt(precioIngresado.value), "productoNuevo.png")
   //pusheo al array:
   array.push(ProductoNuevo)

   //setear en el storage el array con el Producto
   localStorage.setItem("mercaderia", JSON.stringify(array))
   mostrarCatalogo(array)
   
   //reseteo el formulario
   descripcionIngresado.value = ""
   nombreIngresado.value = ""
   precioIngresado.value = ""
}

function buscarInfo(buscado, array){
   let busqueda = array.filter(
      (dato) => dato.descripcion.toLowerCase().includes(buscado.toLowerCase())  || dato.nombre.toLowerCase().includes(buscado.toLowerCase()) 
   )

   busqueda.length == 0 ? 
   (coincidencia.innerHTML = `<h3>No se encontro el producto ${buscado}</h3>`,
   mostrarCatalogo(busqueda)) :
   (coincidencia.innerHTML = "", mostrarCatalogo(busqueda)) 
 }

///////////
//EVENTOS:
//////////

agregarProductoBtn.addEventListener("click", function(event){
   //nos permite que no se actualice al ejecutar el evento
   event.preventDefault()
   // event.target
   agregarProducto(mercaderia)
})

selectOrden.addEventListener("change", () => {
   console.log(selectOrden.value)
   switch(selectOrden.value){
      case "1":
         ordenarMayorMenor(mercaderia)
      break
      case "2":
         ordenarMenorMayor(mercaderia)
      break
      case "3":
         ordenarAlfabeticamentenombre(mercaderia)
      break
      default:
         mostrarCatalogo(mercaderia)
      break
   }
}
)

botonCarrito.addEventListener("click", () => {
   cargarProductosCarrito(productosEnCarrito)
})

buscador.addEventListener("input", () => {
   buscarInfo(buscador.value, mercaderia)
})

document.getElementById("formAgregarCarrito").disabled = false;