//Encadenamiento de Callbacks (Callback Hell controlado)
function tomarDatos (callback) { // con esta funcion se obtiene la informacion del usuario
    console.log("Tomando datos del perfil fisico...");
    setTimeout(function() {
        //se supone que ya se encontro la informacion del usuario
        const datos = {nombre : 'anderonea', nivel : "principiante"}
        //aca se ejecuta el callback, para que se ejecute lo que se vaya a pedir después
        callback(datos)
    },2000)
}

//recibe los datos del usuario para luego 'buscar' el ejercicio
function procesarDatos (datos, callback) { //le pasamos los parametros
    console.log("Procesado ejercicios para nivel: "+ datos.nivel);
    setTimeout(function() {
        const rutina = "Rutina de flexiones y sentadillas"
        //le pasamos la rutina a la siguiente funcion
        callback(rutina)
    },2000)
}

//con esta funcion imprimimos los resultados
function mostrarResultado (rutina) {
    setTimeout(function() {
        console.log("Tu rutina es: " + rutina);
    },1000)
}

// este bloque comienza cuando 'tomarDatos' llama al callback
tomarDatos(function(datos) {
    //arranca cuando procesar ejercicios termina    
    procesarDatos(datos, function(rutina) {
        //mostramos los resultados por pantalla
        mostrarResultado(rutina);
    });
});
