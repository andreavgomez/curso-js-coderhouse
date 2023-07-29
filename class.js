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
  ////////////////////////////////////////////////////////////////////////////////
  // Version con Mockapi: https://64a6eda4096b3f0fcc80d83e.mockapi.io/productos
  ///////////////////////////////////////////////////////////////////////////////
  const cargarMercaderia = async () => {
    const res = await fetch("https://64a6eda4096b3f0fcc80d83e.mockapi.io/productos");
    const data = await res.json();
    return data.map((producto) => new Producto(
      producto.id,
      producto.descripcion,
      producto.nombre,
      producto.precio,
      producto.imagen
    ));
    
  };  
  
  ////////////////////////////////////////////////////////////////////////////////
  // Version con archivo productos.json
  ///////////////////////////////////////////////////////////////////////////////
  // const cargarMercaderia = async () => {
  //   const res = await fetch("productos.json");
  //   const data = await res.json();
  //   return data.map((producto) => new Producto(
  //     producto.id,
  //     producto.descripcion,
  //     producto.nombre,
  //     producto.precio,
  //     producto.imagen
  //   ));
    
  // };

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
