//function que valida que sea un number - Declarando
function validarNumero(num) {
    while (isNaN(num)) {
        //while puede entrar cero o muchas veces
        num = parseInt(prompt("ATENCIÓN INGRESE UN NÚMERO: Ingrese el valor nuevamente"))
    }
    return num
}

function calcularMontoAPagar() {
    //Simulador Interactivo: 
    // function que calcula el monto a pagar segun el medio de pago elegdo
    alert(`Bienvenido !!!.`)
    let montoTotal = parseInt(prompt("Ingrese el monto total de su compra"))
    console.log(`El monto total ingresado es ${montoTotal}.`)
    //MENU do while y switch 
    let salirMenu = false
    let montoAPagar = 0

    do {   
        let medioPagoIngresado = parseInt(prompt(`Seleccione el medio de pago
   1 - Debito
   2 - Credito Banco Nacion
   3 - Credito Banco Galicia
   4 - Credito Banco Santander
   5 - Mercado pago
   0 - Salir del menu`))
        validarNumero(medioPagoIngresado)      

        switch (medioPagoIngresado) {
            case 1:
                montoAPagar = montoTotal - (montoTotal * (10 / 100))
                console.log(`Pagando con la opcion ${medioPagoIngresado}. Ud deberá abonar ${montoAPagar}`)
                alert(`Pagando con la opcion ${medioPagoIngresado}. Ud deberá abonar ${montoAPagar}`)
                break
            case 2:
                montoAPagar = montoTotal - (montoTotal * (20 / 100))
                console.log(`Pagando con la opcion ${medioPagoIngresado}. Ud deberá abonar ${montoAPagar}`)
                alert(`Pagando con la opcion ${medioPagoIngresado}. Ud deberá abonar ${montoAPagar}`)
                break
            case 3:             
                montoAPagar = montoTotal - (montoTotal * (25 / 100))
                console.log(`Pagando con la opcion ${medioPagoIngresado}. Ud deberá abonar ${montoAPagar}`)
                alert(`Pagando con la opcion ${medioPagoIngresado}. Ud deberá abonar ${montoAPagar}`)                
                break
            case 4:
                montoAPagar = montoTotal - (montoTotal * (15/ 100))
                console.log(`Pagando con la opcion ${medioPagoIngresado}. Ud deberá abonar ${montoAPagar}`)
                alert(`Pagando con la opcion ${medioPagoIngresado}. Ud deberá abonar ${montoAPagar}`)               
                break
            case 5:           
                montoAPagar = montoTotal - (montoTotal * (5 / 100))
                console.log(`Pagando con la opcion ${medioPagoIngresado}. Ud deberá abonar ${montoAPagar}`)
                alert(`Pagando con la opcion ${medioPagoIngresado}. Ud deberá abonar ${montoAPagar}`)
                break                            
            case 0:
                alert(`Gracias por utilizar nuestra app. Saludos!`)
                salirMenu = true
                break
            default:
                alert("Opción no válida, ingrese alguna presente en el menu")
                break
        }
    } while (!salirMenu)
}

calcularMontoAPagar()