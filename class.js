//class constructora
class Producto{
    constructor(id, descripcion, nombre, precio, imagen){
       this.id = id,
       this.descripcion = descripcion,
       this.nombre = nombre,
       this.precio = precio,
       this.imagen = imagen
 
    }
 }
 
 //Instanciación de objetos: 
 const Producto1 = new Producto(1,"Con chocolate y oreos", "Brownie con Oreo",3200, "brownie_oreo.jpg")
 
 const Producto2 = new Producto(2,"Con crema de limon", "Torta Lemon pie",3000, "lemon_pie.jpg")
 
 const Producto3 = new Producto(3,"Con crema chantilly","Torta de Frutillas",  2800, "frutillas.jpg")
 
 const Producto4 = new Producto(4,"Masa de hojaldre","Mil hojas", 3800, "milHojas.jpg")
 
 const Producto5 = new Producto(5,"Con mousse de chocolate","Torta de Chocolate", 2200, "chocolate.jpg")
 
 const Producto6 = new Producto(6, "Con dulce de leche","Torta Brownie", 2500, "brownie.jpg")
 
 //CREAR UN ARRAY DE OBJETOS
let mercaderia = [] 
 //ver si LA KEY en el storage "mercaderia" y evaluar si debo crear el array en el storage o capturalo
 
if(localStorage.getItem("mercaderia")){
    //cuando no es la primera vez, me traigo lo de storage
    mercaderia = JSON.parse(localStorage.getItem("mercaderia"))
}else{
    // SETEAMOS ARRAY
    mercaderia.push(Producto1, Producto2, Producto3, Producto4, Producto5, Producto6)
    localStorage.setItem("mercaderia", JSON.stringify(mercaderia))
}
