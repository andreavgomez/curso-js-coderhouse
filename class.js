//Clase Constructora
class Producto {
    constructor(id, descripcion, nombre, precio, imagen) {
      this.id = id;
      this.descripcion = descripcion;
      this.nombre = nombre;
      this.precio = precio;
      this.imagen = imagen;
      this.cantidad = 1;
    }
    sumarUnidad() {
      this.cantidad = parseInt(this.cantidad) + 1;
      return this.cantidad;
    }
    restarUnidad() {
      this.cantidad = parseInt(this.cantidad) - 1;
      return this.cantidad;
    }
  }
  
  let mercaderia = [];
  const cargarMercaderia = async () => {
    const res = await fetch("productos.json");
    const data = await res.json();
    return data.map((producto) => new Producto(
      producto.id,
      producto.descripcion,
      producto.nombre,
      producto.precio,
      producto.imagen
    ));
    
  };

(async () => {
  mercaderia = await cargarMercaderia();
  
  if (localStorage.getItem("mercaderia")) {
    console.log(`Existe mercaderia en el storage`);
    mercaderia = JSON.parse(localStorage.getItem("mercaderia"));
  } else {
    console.log(`No existe mercaderia en el storage`);
    localStorage.setItem("mercaderia", JSON.stringify(mercaderia));
  }

  mostrarCatalogo(mercaderia);

})();

// Resto del código...

// Agrega el método "hide" al objeto Modal para poder cerrarlo programáticamente
// if (typeof bootstrap !== "undefined" && typeof bootstrap.Modal !== "undefined") {
//   bootstrap.Modal.prototype.hide = function () {
//     const backdrop = document.querySelector(".modal-backdrop");
//     if (backdrop) {
//       backdrop.remove();
//     }
//     this._element.style.display = "none";
//   };
// }

// Resto del código...



//   const cargarMercaderia = async () => {
//     const res = await fetch("productos.json");
//     const data = await res.json();
  
//     for (let producto of data) {
//       const nuevoProducto = new Producto(
//         producto.id,
//         producto.descripcion,
//         producto.nombre,
//         producto.precio,
//         producto.imagen
//       );
//       mercaderia.push(nuevoProducto);
//     }
//     localStorage.setItem("mercaderia", JSON.stringify(mercaderia));
//   };
  
//   let mercaderia = [];
  
//   if (localStorage.getItem("mercaderia")) {
//     console.log(`Existe mercaderia en el storage`);
//     mercaderia = JSON.parse(localStorage.getItem("mercaderia"));
//   } else {
//     console.log(`No existe mercaderia en el storage`);
//     cargarMercaderia();
//   }
  

// //class constructora
// class Producto{
//     constructor(id, descripcion, nombre, precio, imagen){
//        this.id = id,
//        this.descripcion = descripcion,
//        this.nombre = nombre,
//        this.precio = precio,
//        this.imagen = imagen,
//        this.cantidad = 1
//     }
//     sumarUnidad(){
//         this.cantidad = this.cantidad + 1
//         return this.cantidad
//     }
//     restarUnidad(){
//         this.cantidad = this.cantidad - 1
//         return this.cantidad
//     }    
//  }
 
// //  //Instanciación de objetos: 
// //  const Producto1 = new Producto(1,"Con chocolate y oreos", "Brownie con Oreo",3200, "brownie_oreo.jpg")
// //  const Producto2 = new Producto(2,"Con crema de limon", "Torta Lemon pie",3000, "lemon_pie.jpg")
// //  const Producto3 = new Producto(3,"Con crema chantilly","Torta de Frutillas",  2800, "frutillas.jpg")
// //  const Producto4 = new Producto(4,"Masa de hojaldre","Mil hojas", 3800, "milHojas.jpg")
// //  const Producto5 = new Producto(5,"Con mousse de chocolate","Torta de Chocolate", 2200, "chocolate.jpg")
// //  const Producto6 = new Producto(6, "Con dulce de leche","Torta Brownie", 2500, "brownie.jpg")
 
// //  //CREAR UN ARRAY DE OBJETOS
// // let mercaderia = [] 
// //  //ver si LA KEY en el storage "mercaderia" y evaluar si debo crear el array en el storage o capturalo
 
// // if(localStorage.getItem("mercaderia")){
// //     //cuando no es la primera vez, me traigo lo de storage
// //     mercaderia = JSON.parse(localStorage.getItem("mercaderia"))
// // }else{
// //     // SETEAMOS ARRAY
// //     mercaderia.push(Producto1, Producto2, Producto3, Producto4, Producto5, Producto6)
// //     localStorage.setItem("mercaderia", JSON.stringify(mercaderia))
// // }

// ///////////////////////////////////////////////////////////////
// const cargarMercaderia = async () =>{
//     const res = await fetch("productos.json")
//     const data = await res.json()

//     for(let producto of data){
//         // let libroData = new Libro(libro.id, libro.autor, libro.titulo, libro.precio, libro.imagen)
//         // let nuevoProducto = new Producto(producto.id, producto.descripcion, producto.nombre, producto.precio, producto.imagen)
//         const nuevoProducto = new Producto(producto.id, producto.descripcion, producto.nombre, producto.precio, producto.imagen)
//         console.log(`Antes del push`)
//         mercaderia.push(nuevoProducto)
//         console.log(`Desppues del push`)
//     }
//     console.log(`Antes del setItem Mercaderia`)
//     localStorage.setItem("mercaderia", JSON.stringify(mercaderia))
//     // console.log(`Antes del getItem Mercaderia`)
//     // mercaderia = JSON.parse(localStorage.getItem("mercaderia"))
// }

// let mercaderia = [] 
 
// if ( localStorage.getItem("mercaderia") ) {
//     //Si existe mercaderia, me la traigo del storage
//     console.log(`Esiste mercaderia en el store`)
//     mercaderia = JSON.parse(localStorage.getItem("mercaderia"))
// } else {
//     //Si No existe mercaderia en el storage, la cargo
//     console.log(`No esiste mercaderia en el store`)
//     cargarMercaderia()
//     // console.log(`Antes del getItem Mercaderia`)
//     // mercaderia = JSON.parse(localStorage.getItem("mercaderia"))
// }

// /////////////////////////////////////////////////
// // const cargarMercaderia = async () =>{
// //     // const res = await fetch("productos.json")
// //     // const productos = await res.json()

// //     fetch("https://64a6eda4096b3f0fcc80d83e.mockapi.io/productos")
// //       .then((res) => res.json())
// //       .then((productos) => {
// //         this.productos = productos;
// //     //   });    

// //     for(let producto of this.productos){
// //         // let nuevoProducto = new Producto(producto.id, producto.descripcion, producto.nombre, producto.precio, producto.imagen)
// //         let nuevoProducto = JSON.stringify(new Producto(producto.id, producto.descripcion, producto.nombre, producto.precio, producto.imagen))
// //         // console.log(`nuevoProducto ${ JSON.stringify(nuevoProducto)}`)
// //         console.log(`nuevoProducto ${nuevoProducto}`)
// //         mercaderia.push(nuevoProducto)
// //         // mercaderia.push(JSON.stringify(nuevoProducto))
// //     }
// //     console.log(`Antes de setItem mercaderia`)
// //     localStorage.setItem("mercaderia", JSON.stringify(mercaderia))
// //     console.log(`Despues de SetItem mercaderia`)

// // });    
// // }    