// Captura del DOM
let ProductosDiv = document.getElementById("Productos")
let agregarProductoBtn = document.getElementById("guardarProductoBtn")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let botonConexion = document.getElementById("botonConexion");
let botonConectar = document.getElementById("botonConectar");
let modalConexion;

document.getElementById("mostrarCargarProducto").style.display = "none";

//array con los productos en el carrito
let productosEnCarrito
if (localStorage.getItem("carrito")) {
  //Si existe en el storage
  productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
  //no existe en el storage
  productosEnCarrito = []
  localStorage.setItem("carrito", productosEnCarrito)
}


document.addEventListener("DOMContentLoaded", function () {
  // Aca va el código que se ejecuta después de que se carga el DOM

  let cargarProducto = document.getElementById("cargarProducto");
  let selectOrden = document.getElementById("selectOrden");
  let opcionCargaProducto = document.getElementById("mostrarCargarProducto");

  selectOrden.addEventListener("change", function () {
    if (selectOrden.value === "4") {
      document.getElementById("mostrarCargarProducto").style.display = "block";
      cargarProducto.style.display = "block";
      opcionCargaProducto.textContent = "Ocultar Carga de Producto";
    } else {
      document.getElementById("mostrarCargarProducto").style.display = "none";
      cargarProducto.style.display = "none";
      opcionCargaProducto.textContent = "Cargar nuevo Producto";
    }
  });

  // Evento "Cargar nuevo producto"
  opcionCargaProducto.addEventListener("click", function () {
    if (cargarProducto.style.display === "none") {
      cargarProducto.style.display = "block";
      opcionCargaProducto.textContent = "Ocultar Carga de Producto";
    } else {
      cargarProducto.style.display = "none";
      opcionCargaProducto.textContent = "Cargar nuevo Producto";
    }
  });

  mostrarCatalogo(mercaderia);

  //////////////////////////////////
  // // Vincular el evento al hacer clic en el ícono de conexión
  // botonConexion.addEventListener("click", mostrarModalConexion);

  // Evento para mostrar el modal de conexion al hacer clic en el botón
  botonConexion.addEventListener("click", () => {
    mostrarModalConexion();
  });

  // Función para mostrar el modal de conexión
  function mostrarModalConexion() {
    let modalConexion = new bootstrap.Modal(document.getElementById("modalConexion"));
    modalConexion.show();
  }

  // Cerrar el modal después de hacer clic en "Conectar"
  let modalConexion = new bootstrap.Modal(document.getElementById("modalConexion"));
  modalConexion.hide();

  // Vincular el evento al hacer clic en el botón "Cerrar" dentro del modal
  document.querySelector("#modalConexion .btn-close").addEventListener("click", () => {
    let modalConexion = new bootstrap.Modal(document.getElementById("modalConexion"));
    modalConexion.hide();
  });

  // Vincular el evento al hacer clic en el botón "Conectar" dentro del modal
  botonConectar.addEventListener("click", () => {
    console.log(botonConectar)
    let usuarioInput = document.getElementById("usuarioInput").value;
    let passwordInput = document.getElementById("passwordInput").value;
    console.log(usuarioInput)
    console.log(passwordInput)
    if (usuarioInput === "admin" && passwordInput === "admin123") {
      // Si el usuario es admin, habilitar opciones
      console.log("habilitarOpcionesAdmin")
      habilitarOpcionesAdmin();
      modalConexion.hide();
    } else {
      // Si el usuario no es admin, deshabilitar opciones
      console.log("deshabilitarOpcionesNoAdmin")
      deshabilitarOpcionesNoAdmin();
      modalConexion.hide();
    }

    // Actualizar el array mercaderia antes de mostrar el catálogo
    cargarMercaderia().then((data) => {
      mercaderia = data;
      mostrarCatalogo(mercaderia);
    });

  });
  //////////////////////////////////  

});

////////////
//FUNCTIONS 
///////////

////////////////////////////////////////////////

// Habilitar opciones para usuario admin
function habilitarOpcionesAdmin() {
  // Habilitar la opción "Cargar Nuevo Producto" en el select
  console.log("En habilitarOpcionesAdmin")
  document.querySelector('option[value="4"]').disabled = false;
  console.log("option[value=4).disabled = false")
  // Mostrar el botón "cargar nuevo producto"
  document.getElementById("mostrarCargarProducto").style.display = "block";
  console.log("mostrarCargarProducto.style.display = block")
}

// Deshabilitar opciones para usuario no admin
function deshabilitarOpcionesNoAdmin() {
  console.log("En DeshabilitarOpcionesAdmin")
  // Deshabilitar la opción "Cargar Nuevo Producto" en el select
  document.querySelector('option[value="4"]').disabled = true;
  // Ocultar el botón "cargar nuevo producto"
  document.getElementById("mostrarCargarProducto").style.display = "none";
}
/////////////////////////////////////////////////

function mostrarCatalogo(array) {
  //resetear el DOM
  ProductosDiv.innerHTML = ``
  //Recorrer array para imprimir en el DOM
  for (let Producto of array) {
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

    // Evento "Agregar al carrito"
    agregarBtn.addEventListener("click", () => {
      agregarAlCarrito(Producto)
    })
  }

}

function agregarAlCarrito(producto) {
  let ProductoAgregado = productosEnCarrito.find((elem) => elem.id === producto.id);
  if (ProductoAgregado === undefined) {
    const productoNuevo = new Producto(
      producto.id,
      producto.descripcion,
      producto.nombre,
      producto.precio,
      producto.imagen
    );
    productosEnCarrito.push(productoNuevo);
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));    
    console.log(`El Producto ${producto.nombre} se ha agregado con éxito.`);
    verificarBotonFinalizarCompra(); // Verificar el botón cada vez que se agrega un producto
    //Sweetalert 
    Swal.fire({
      title: `El Producto se agregó al carrito exitosamente !!`,
      confirmButtonColor: "blue",
      confirmButtonText: "Ok"
    })

  } else {
    console.log(`El Producto ${ProductoAgregado.nombre} ya existe en el carrito.`);
    //Sweetalert 
    Swal.fire({
      title: `El Producto ya existe en el carrito`,
      icon: "info",
      showConfirmButton: false,
      timer: 2800
    })
  }
}


function sumarUnidad(productoCarrito) {
  productoCarrito.sumarUnidad();
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
  cargarProductosCarrito(productosEnCarrito);
}

// Asignar evento a los botones de sumar
function asignarEventoSumar() {
  productosEnCarrito.forEach((productoCarrito) => {
    document.getElementById(`botonSumarUnidad${productoCarrito.id}`).addEventListener("click", () => {
      sumarUnidad(productoCarrito);
    });
  });
}

function restarUnidad(productoCarrito) {
  let cantProd = productoCarrito.restarUnidad();
  if (cantProd < 1) {
    let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`);
    cardProducto.remove();
    let productoEliminar = productosEnCarrito.find((producto) => producto.id === productoCarrito.id);
    let posicion = productosEnCarrito.indexOf(productoEliminar);
    productosEnCarrito.splice(posicion, 1);
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    verificarBotonFinalizarCompra(); // Verificar el botón cada vez que se elimina un producto
    calcularTotal(productosEnCarrito);
  } else {
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
  }
  cargarProductosCarrito(productosEnCarrito);
}

// Asignar evento a los botones de restar
function asignarEventoRestar() {
  productosEnCarrito.forEach((productoCarrito) => {
    document.getElementById(`botonEliminarUnidad${productoCarrito.id}`).addEventListener("click", () => {
      restarUnidad(productoCarrito);
    });
  });
}

function eliminarProducto(productoCarrito) {
  // Buscar el índice del producto a eliminar en el array
  const productoIndex = productosEnCarrito.findIndex((producto) => producto.id === productoCarrito.id);

  if (productoIndex !== -1) {
    // Elimina el producto del array
    productosEnCarrito.splice(productoIndex, 1);
    // Actualizar el storage con el nuevo array
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    verificarBotonFinalizarCompra(); // Verificar el botón cada vez que se elimina un producto
    // Cargar los productos en el carrito
    cargarProductosCarrito(productosEnCarrito);
  }
  // Actualizar el total después de eliminar el producto
  calcularTotal(productosEnCarrito);
}

// Asignar evento a los botones de eliminar
function asignarEventoEliminar() {
  productosEnCarrito.forEach((productoCarrito) => {
    document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
      eliminarProducto(productoCarrito);
    });
  });
}

function cargarProductosCarrito(array) {
  modalBodyCarrito.innerHTML = ``
  array.forEach((productoCarrito) => {
    modalBodyCarrito.innerHTML += `
      <table class="table">
        <tr>
          <td>Imagen</td>
          <td>Producto</td>
          <td>Precio</td>
          <td>Cantidad</td>
          <td>SubTotal</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="productoCarrito${productoCarrito.id}"> 
          <td>
            <img class="card-img-top" style="max-width: 120px;" src="assets/${productoCarrito.imagen}" alt="">
          </td>
          <td>${productoCarrito.nombre}</td>
          <td>${productoCarrito.precio}</td>
          <td>${productoCarrito.cantidad}</td>
          <td>${productoCarrito.cantidad * productoCarrito.precio}</td>
          <td><button class="btn btn-success" id="botonSumarUnidad${productoCarrito.id}"><i class=""></i>+</button></td>
          <td><button class="btn btn-danger" id="botonEliminarUnidad${productoCarrito.id}"><i class=""></i>-</button></td>
          <td><button class="btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button></td>         
        </tr>
      </table>
    `
  })
  array.forEach((productoCarrito) => {
    // Llamar a las funciones para asignar los eventos
    asignarEventoSumar();
    asignarEventoRestar();
    asignarEventoEliminar();
    // Actualizar el total después de eliminar el producto
    calcularTotal(array);
  })
  calcularTotal(array)

}

function calcularTotal(array) {
  let total = array.reduce((acc, productoCarrito) => {
    if (productoCarrito.cantidad) {
      return acc + productoCarrito.precio * productoCarrito.cantidad;
    }
    return acc;
  }, 0);

  precioTotal.textContent = total == 0 ? `No hay productos en el carrito` : `Total: ${total}`;
}

function ordenarAlfabeticamentenombre(array) {
  const arrayAlfabetico = [].concat(array)
  arrayAlfabetico.sort((a, b) => {
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

function ordenarMenorMayor(array) {
  //Copia del array original, para aplicar sort y no modificar Mercaderia
  const menorMayor = [].concat(array)
  console.log(menorMayor)
  //ordena en forma ascendente por precio
  menorMayor.sort((a, b) => a.precio - b.precio)
  mostrarCatalogo(menorMayor)
}

function ordenarMayorMenor(array) {
  const mayorMenor = [].concat(array)
  //ordena en forma descendente 
  mayorMenor.sort((elem1, elem2) => elem2.precio - elem1.precio)
  mostrarCatalogo(mayorMenor)
}

function agregarProducto(array) {
  let descripcionIngresado = document.getElementById("descripcionInput")
  let nombreIngresado = document.getElementById("nombreInput")
  let precioIngresado = document.getElementById("precioInput")

  const ProductoNuevo = new Producto(array.length + 1, descripcionIngresado.value, nombreIngresado.value, parseInt(precioIngresado.value), "productoNuevo.png")
  //pusheo el producto al array:
  array.push(ProductoNuevo)

  //setear en el storage el array con el Producto
  localStorage.setItem("mercaderia", JSON.stringify(array))
  mostrarCatalogo(array)

  console.log(`El Producto ${ProductoNuevo.nombre}, se creó con éxito.`);
  //Sweetalert 
  Swal.fire({
    title: `El Producto ${ProductoNuevo.nombre}, se creó con éxito !!`,
    confirmButtonColor: "blue",
    confirmButtonText: "Ok"
  })

  //resetear formulario
  descripcionIngresado.value = ""
  nombreIngresado.value = ""
  precioIngresado.value = ""
}

function buscarInfo(buscado, array) {
  let busqueda = array.filter(
    (dato) => dato.descripcion.toLowerCase().includes(buscado.toLowerCase()) || dato.nombre.toLowerCase().includes(buscado.toLowerCase())
  )

  busqueda.length == 0 ?
    (coincidencia.innerHTML = `<h3>No se encontro el producto ${buscado}</h3>`,
      mostrarCatalogo(busqueda)) :
    (coincidencia.innerHTML = "", mostrarCatalogo(busqueda))
}

  // Función para verificar y mostrar u ocultar el botón "Finalizar Compra"
  function verificarBotonFinalizarCompra() {
    const botonFinalizarCompra = document.getElementById("botonFinalizarCompra");
   
    if (productosEnCarrito.length === 0) {
      botonFinalizarCompra.style.display = "none"; // Ocultar el botón si el carrito está vacío
    } else {
      botonFinalizarCompra.style.display = "block"; // Mostrar el botón si el carrito no está vacío
    }
  }

function finalizarCompra(array) {
  //Sweetalert 
  Swal.fire({
    title: '¿Desea confirmar su compra?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: 'blue',
    cancelButtonColor: 'red',
  }).then((result) => {
    if (result.isConfirmed) {
      let totalFinal = calcularTotal(array)
      Swal.fire({
        title: 'Su compra se realizó con éxito',
        icon: 'success',
        confirmButtonColor: 'blue'
      })
      productosEnCarrito = []
      localStorage.removeItem("carrito")
    } else {
      Swal.fire({
        title: 'Su Compra fue cancelada',
        icon: 'info',
        text: `Su Compra fue cancelada, pero sus productos siguen en el carrito`,
        confirmButtonColor: 'blue'
      })
    }
  })
}


///////////
//EVENTOS:
//////////

agregarProductoBtn.addEventListener("click", function (event) {
  //Permite que no se actualice al ejecutar el evento
  event.preventDefault()
  agregarProducto(mercaderia)
})

selectOrden.addEventListener("change", () => {
  switch (selectOrden.value) {
    case "1":
      ordenarAlfabeticamentenombre(mercaderia)
      break
    case "2":
      ordenarMenorMayor(mercaderia)
      break
    case "3":
      ordenarMayorMenor(mercaderia)
      break
    default:
      mostrarCatalogo(mercaderia)
      break
  }
}
)

// Evento para mostrar el carrito al hacer clic en el botón
botonCarrito.addEventListener("click", () => {
  cargarProductosCarrito(productosEnCarrito);
  verificarBotonFinalizarCompra(); // Verificar el botón cada vez que se elimina un producto
});

buscador.addEventListener("input", () => {
  buscarInfo(buscador.value, mercaderia)
})

document.getElementById("formAgregarCarrito").disabled = false;

//boton finalizar compra
botonFinalizarCompra.addEventListener("click", () => {
  finalizarCompra(productosEnCarrito)
})