//codigo bloqueante

// console.log("Inicio");

// for (let i = 0; i < 1000000000; i++) {
//     //se disumula una operacion pesada
//     //con esto se hace una espera para luego ejecutar el Fin del programa
// }

// console.log("Fin"); //antes tocar el fin el codigo esta congelado, ya que se entiende que el codigo
//                     //esta congelado durando todo el proceso del for



// solucion al problema 
console.log("Inicio"); //se ejecuta primero

setTimeout(() => {
    console.log("un tiempo fuera"); // una vez libre se ejecuta la 'asincronia' o el setTimeout
}, 0);

for (let i = 0; i < 1000000000; i++) {} // hasta que que cumpla el for, se ejecuta el setTimeout

console.log("Fin");// se ejecuta primero

