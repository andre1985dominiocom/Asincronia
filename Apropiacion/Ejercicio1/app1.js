console.log("Inicio"); //aca se muestra un mensaje de inicio

setTimeout(function () {
    console.log("prueba");
}, 2000) //se entiende que se ejecuta esta funcion despues de dos segundos

console.log("Fin"); //pero antes de imprimirse la funcion se imprime el 'Fin', ya que toma por prioridad los que son sincronos.