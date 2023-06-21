
//Pre Entrega 2

/////////////////////////////////////////
class Medico{
   constructor(id, nombreMedico, especialidad){
      this.id = id,
      this.nombreMedico = nombreMedico,
      this.especialidad = especialidad
   }
   mostrarInfoMedico(){
      console.log(`El medico se llama ${this.nombreMedico} y su especialidad es ${this.especialidad}`)
   }   
}

const medico1 = new Medico(1,"Oscar Juarez", "Nutricion")
const medico2 = new Medico(2,"Jose Garcia", "Medico Clinico")
const medico3 = new Medico(3,"Alejandra Gutierrez", "Pediatria")
const medico4 = new Medico(4,"Luis Barros","traumatologia")

const staffMedico = []
staffMedico.push(medico1, medico2, medico3, medico4)

//////////////////////////////////////
function agregarMedico(){
    let nuevoMedico = prompt("Ingrese el nombre del medico")
    let especialidadNuevoMedico = prompt("Ingrese la especialidad")
    const medicoNuevo = new Medico(staffMedico.length+1,nuevoMedico, especialidadNuevoMedico)
    staffMedico.push(medicoNuevo)
    
}

function verStaffMedico(array){
    console.log(`Nuestro staff medico es el siguiente: `)
   for(let medico of array){
        console.log(medico.id, medico.nombreMedico,medico.especialidad)
   }
}

function buscarPorEspecialidad(array){
   let especialidadBuscada = prompt("Ingrese la especialidad que desea buscar")
   let espEncontrada = array.find(
      (medico) => medico.especialidad.toUpperCase() === especialidadBuscada.toUpperCase()
   )
   if(espEncontrada == undefined){
      console.log(`No tenemos medicos con la especialidad ${especialidadBuscada} en nuestro staff`)
   }else{
      console.log(espEncontrada)
   }
}

function buscarPorMedico(arr){
   let medicoBuscado = prompt("Ingrese el nombre del medico que desea buscando")
   let medicoEncontrado = arr.filter(
      (medico) => medico.nombreMedico.toLowerCase() == medicoBuscado.toLowerCase()
   )
   if(arr.length == 0){
      console.log(`El medico ${medicoBuscado} no se encuentra en nuestro staff`)
   }else{
      //reutilizamos un function que nos permite mostrar un array
      verStaffMedico(medicoEncontrado)
   }
}

function eliminarMedico(array){
   verStaffMedico(array)
   let eliminarID = parseInt(prompt("Ingrese el id que desea eliminar"))
   let arrayID = array.map(medico => medico.id)
   console.log(arrayID)
   let indice = arrayID.indexOf(eliminarID)
   console.log(indice)
   array.splice(indice, 1)
   verStaffMedico(array)
}

function ordenarMedicosAlfabeticamente(array){
   const arrayAlfabetico = [].concat(array)
   arrayAlfabetico.sort( (a,b) =>{
      if (a.nombreMedico > b.nombreMedico) {
         return 1
       }
       if (a.nombreMedico < b.nombreMedico) {
         return -1
       }
       return 0
   })
   verStaffMedico(arrayAlfabetico)
}

////////////////////////////////////////////////////////

function menuApp(){
   let salirMenu = false   
   do{
   let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
      1 - Agregar Medico
      2 - Borrar Medico
      3 - Consultar staff medico
      4 - Buscar por Medico
      5 - Buscar por Especialidad
      6 - Ordenar Medicos alfabeticamente:
      0 - Salir del menu`))
      switch(opcionIngresada){
         case 1:
            agregarMedico()  
         break
         case 2:
            eliminarMedico(staffMedico)
         break
         case 3:
            verStaffMedico(staffMedico)
         break
         case 4:
            buscarPorMedico(staffMedico)
         break
         case 5:
            buscarPorEspecialidad(staffMedico)
         break
         case 6:
            ordenarMedicosAlfabeticamente(staffMedico)
         break            
         case 0:
            console.log(`Ud salio del menu, hasta la proxima`)
            salirMenu = true
         break   
         default:
            console.log("Opción de menu invalida")
         break
      }
   }while(!salirMenu)
}

 menuApp()

