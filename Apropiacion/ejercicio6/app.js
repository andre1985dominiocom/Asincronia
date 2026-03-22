// Crear una promesa que simule un proceso que puede fallar 50% de las veces usando resolve y reject.

// Meta: entender .catch() y la importancia del manejo de errores.


//definimos un fuction llamada promesaFalla

function promesaFallar() {
    // retornamos un nueva promesa, la promesa es asincronica, que puede terminar bien o mal
    // (resolve)(reject)
    
    return new Promise((resolve, reject) => {

        //creamos una const donde se genera un numero aleatorio entre 0 y 1, con match.random().
        // si es mayor que 0.5 se considera que fue exitoso
        const exito = Math.random() > 0.8;

        // si exito es true llamamos a roselver la promesa y se 
        if (exito) {
            //resolve funcion que cumple la promesa como cumplida y devuelve este mensjae
            resolve("proceso completado con exito");
        }else{
            // reject funcion que marca la promesa fallida y devuelve este error
            reject("error: el proceso fallo")
        }
    });

}

//aqui llamamos la funcion para que devuelva la promesa
promesaFallar()
// then: se ejecuta si la promesa se cumple, (se llama resolve).
// el parametro resultado recibe el valor pasado resolve
.then(resultado => console.log(resultado))
// con el catch ejecuta si la promesa falla, se llama a (reject)
// el parametro error, recibe el valor pasado de reject 
.catch(error => console.error(error));