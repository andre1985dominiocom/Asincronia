// Transformando Callbacks en Promesas

// tomar datos donde se devuelve una promesa
function tomarDatos() {
    return new Promise((resolve) => {
        console.log("Tomando datos del perfil fisico...");
        setTimeout(() => {
            const perfil = { nombre: "Nea", nivel: "Avanzado" };
            resolve(perfil); // 'envia' el perfil a un siguiente paso
        }, 2000);
    });
}

// aqui se procesan los datos
function procesarEjercicios(perfil) {
    return new Promise((resolve) => {
        console.log("Filtrando ejercicios para: " + perfil.nivel);
        setTimeout(() => {
            const lista = ["Ejercicio 1", "Ejercicio 2"];
            resolve(lista); // "Envía" la lista filtrada
        }, 2000);
    });
}

// imprimimos resultados por pantalla
function mostrarResultado(rutina) {
    console.log("Tu rutina avanzada es: " + rutina.join(", "));
}

tomarDatos()
    .then(perfil => {
        // retornamos la siguiente promesa para seguir la cadena
        return procesarEjercicios(perfil); 
    })
    .then(rutina => {
        // recibimos el resultado del paso anterior
        mostrarResultado(rutina);
    })
    .catch(error => {
        // si cualquiera de los pasos anteriores falla, el error va a caer aqui
        console.error("Hubo un problema en la buxqueda:", error);
    });