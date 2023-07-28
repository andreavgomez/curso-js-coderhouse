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

////////////////////////////////////////////////////////////////////////////////
// Version con Mockapi  https://64a6eda4096b3f0fcc80d83e.mockapi.io/productos//
///////////////////////////////////////////////////////////////////////////////
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