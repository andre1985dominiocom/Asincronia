// Ejercicio Integrador 2
// 8.2. Centro de Procesamiento de Órdenes
// Vamos a simular un centro que procesa órdenes de forma asincrónica.
// Cada orden requiere pasar por varios pasos: verificación, procesamiento, registro y notificación.
// Algunos pasos tardan más tiempo que otros y debemos garantizar que el sistema no se bloquee.
// Usaremos callbacks, promesas y async/await dentro del mismo ejercicio para comparar cómo evoluciona el flujo.
// Este ejercicio exige analizar: tiempos, dependencias, orden de ejecución y estructura del código.
// Requerimientos del programa
// Datos de entrada
// • Una lista de órdenes en un arreglo, por ejemplo:
// const ordenes = [
// { id: 1, cliente: "Ana", monto: 120000 },
// { id: 2, cliente: "Luis", monto: 80000 },
// { id: 3, cliente: "María", monto: 150000 }
// ];
// Tiempos simulados de los procesos:
// • Verificación: 1500 ms
// • Procesamiento: 2000 ms
// • Registro: 1000 ms
// • Notificación: 500 ms
// Datos de salida esperados
// • Mensajes con marcas de tiempo que permitan determinar:
//   o Duración total del proceso por orden
//   o Orden de ejecución real
//   o Identificación de procesos paralelos y procesos secuenciales
// • Un reporte final indicando qué órdenes se completaron y en qué tiempos.
// Tareas
// 1. Primera parte (Callbacks):
//  o Implementar el flujo completo de una sola orden usando callbacks.
//  o Analizar el tiempo total.
//  o Identificar visualmente el “callback hell” y documentarlo.
// 2. Segunda parte (Promesas + then):
//  o Reescribir el mismo proceso usando promesas.
//  o Validar si la estructura se vuelve más clara.
//  o Registrar tiempos.
// 3. Tercera parte (Async/Await):
//  o Implementar el procesamiento de todas las órdenes con async/await.
//  o Procesarlas en serie (una detrás de otra).
//  o Luego procesarlas en paralelo (todas a la vez).
//  o Comparar tiempos y justificar la diferencia.

// Datos de entrada
const ordenes = [
    { id: 1, cliente: "Ana", monto: 120000 },
    { id: 2, cliente: "Luis", monto: 80000 },
    { id: 3, cliente: "María", monto: 150000 }
];

// Tiempos simulados de los procesos
const tiempos = {
    verificacion: 1500,
    procesamiento: 2000,
    registro: 1000,
    notificacion: 500
};

// Funciones para cada proceso usando callbacks
function verificarOrden(orden, callback) { // Simula la verificación de la orden
    setTimeout(() => {
        console.log(`Orden ${orden.id} verificada a las ${new Date().toLocaleTimeString()}`);
        callback(null, orden);
    }, tiempos.verificacion);
}

function procesarOrden(orden, callback) { // Simula el procesamiento de la orden
    setTimeout(() => {
        console.log(`Orden ${orden.id} procesada a las ${new Date().toLocaleTimeString()}`);
        callback(null, orden);
    }, tiempos.procesamiento);
}

function registrarOrden(orden, callback) { // Simula el registro de la orden
    setTimeout(() => {
        console.log(`Orden ${orden.id} registrada a las ${new Date().toLocaleTimeString()}`);
        callback(null, orden);
    }, tiempos.registro);
}

function notificarCliente(orden, callback) { // Simula la notificación al cliente
    setTimeout(() => {
        console.log(`Cliente ${orden.cliente} notificado a las ${new Date().toLocaleTimeString()}`);
        callback(null, orden);
    }, tiempos.notificacion);
}

// Función para procesar una orden completa usando callbacks
function procesarOrdenCompleta(orden) { // Aquí se puede observar el "callback hell"
                                        // debido a la anidación de múltiples callbacks
    const startTime = new Date();
    verificarOrden(orden, (err, ordenVerificada) => {
        if (err) return console.error(err);
            procesarOrden(ordenVerificada, (err, ordenProcesada) => {
        if (err) return console.error(err);
            registrarOrden(ordenProcesada, (err, ordenRegistrada) => {
        if (err) return console.error(err);
            notificarCliente(ordenRegistrada, (err, ordenNotificada) => {
            if (err) return console.error(err);
            const endTime = new Date();
            const duration = (endTime - startTime) / 1000;
            console.log(`Orden ${orden.id} completada en ${duration} segundos`);
        });
        });
    });
    });
}

// Procesar las ordenes usando callbacks
procesarOrdenCompleta(ordenes[0]);
procesarOrdenCompleta(ordenes[1]);
procesarOrdenCompleta(ordenes[2]);

// Objetivos de análisis
// Se requiere analizar los siguientes puntos:
// • Explicar por qué la versión sincrónica (si existiera) bloquearía todo.
// RTA: En una versión sincrónica, cada proceso (verificación, procesamiento, registro, notificación)
// se ejecutaría uno después del otro, bloqueando el hilo principal de ejecución.
// Esto significa que mientras una orden está siendo procesada, ninguna otra orden podría ser atendida,
// lo que resultaría en tiempos de espera prolongados y una mala experiencia para los clientes.

// • Identificar qué tareas sí pueden correr en paralelo y justificarlas.
// RTA: En este caso, cada orden es independiente de las demás,
// por lo que podrían ser procesadas en paralelo sin afectar el resultado de cada una.
// por lo que todas las órdenes podrían ser procesadas en paralelo.

// • Comparar los tiempos reales vs. los tiempos teóricos.
// RTA: En la versión con callbacks, el tiempo total para procesar una orden sería la suma de los tiempos de cada proceso
// (1500 + 2000 + 1000 + 500 = 5000 ms). Sin embargo, debido a la naturaleza asincrónica,
// el tiempo real puede variar ligeramente debido a factores como la carga del sistema y la gestión de recursos.

// • Explicar cómo el event loop ordena la ejecución.
// RTA: El event loop es un mecanismo que permite a JavaScript manejar operaciones asincrónicas.
// Cuando una función asincrónica se ejecuta, se coloca en la cola de tareas (task queue) después de que el hilo principal
// ha terminado de ejecutar el código sincrónico. El event loop verifica constantemente si el hilo principal está libre,
// y si es así, toma la siguiente tarea de la cola y la ejecuta. Esto permite que las operaciones asincrónicas se manejen
// sin bloquear el hilo principal, permitiendo que otras tareas se ejecuten
// mientras se esperan los resultados de las operaciones asincrónicas.

// • Reconocer cuándo usar callbacks, promesas o async/await para problemas reales.
// RTA: La elección entre callbacks, promesas y async/await depende de la complejidad del código
// y la necesidad de manejar errores de manera eficiente.
// - Callbacks: Son útiles para tareas simples y cuando se desea un control total sobre el flujo de ejecución.
// Sin embargo, pueden llevar al "callback hell" si se anidan demasiados callbacks.
// - Promesas: Son una mejora sobre los callbacks, ya que permiten encadenar operaciones de manera más legible
// y manejan errores de forma más sencilla. Son ideales para flujos de trabajo más complejos.
// - Async/Await: Proporciona una sintaxis aún más clara y fácil de leer para manejar operaciones asincrónicas.
// Es especialmente útil cuando se trabaja con múltiples operaciones asincrónicas que dependen unas de otras,
// ya que permite escribir código que se asemeja a un estilo sincrónico,
// facilitando la comprensión y el mantenimiento del código.