// Crear una función async que espere una promesa de 2 segundos y luego muestre el resultado.

// Meta: comprender cómo await pausa la ejecución sin bloquear el hilo.


//creamos una funcion con el asynt llamada mitarea
async function miTarea() {
    console.log("incia el cronometro");
    
    //dentro de una constante creamos una promesa llamada pausa, que se toma 2 segundo en ejecutarse
    const pausa = new Promise(resolve => setTimeout (resolve, 2000));
    //con await logramos que la funcion se detenga hasat que se cumpla la promesa
    //solamente podemos utilizar el await si utilizamo el async
    await pausa;
    //nos mostata el mensaje pasdo los 2 segundos
    console.log("han pasado 2 segundos ....");
    
}

//llamamos a la funcion mitarea
miTarea();
  