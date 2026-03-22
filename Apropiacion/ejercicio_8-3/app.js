// Ejercicio Integrador 3
// Simulador de Consulta de Usuarios y Roles
// Descripción general
// Vamos a simular una aplicación que debe consultar información desde diferentes fuentes:
// • Datos básicos del usuario
// • Información de seguridad
// • Roles y permisos Algunas consultas son lentas y otras rápidas.
// El propósito es reconstruir el flujo completo, validar que la aplicación no se bloquee
// y comprender el orden real de los resultados.
// Requerimientos del programa
// Datos de entrada
// • Un arreglo de IDs de usuarios:
// const usuarios = [101, 102, 103, 104];
// • Tiempos simulados:
// • Consulta de usuario: 1200 ms
// • Consulta de seguridad: 800 ms
// • Consulta de roles: 2000 ms
// • Registro final: 600 ms
// Datos de salida esperados
// • Para cada usuario, se debe generar un objeto como este:
// {
// id: 101,
// nombre: "Usuario 101",
// seguridad: "OK",
// roles: ["admin", "ventas"],
// tiempoTotal: "3.2 segundos"
// }
// • Registro final de la operación:
// • Tiempo total del grupo
// • Usuarios consultados en paralelo
// • Identificación de cuellos de botella
// Tarea
// 1. Construir una versión bloqueante (solo de demostración):
//    o Usar un ciclo que simule operaciones largas.
//    o Observar cómo el programa se congela.
//    o Documentar por qué no sirve este enfoque.
// 2. Versión asincrónica con Promesas:
//    o Consultar usuario → consultar seguridad → consultar roles → registrar.
//    o Este flujo debe ejecutarse de forma secuencial para cada usuario, pero en paralelo entre usuarios.
// 3. Versión final con Async/Await:
//    o Implementar la misma lógica usando async/await.
//    o Registrar tiempos reales con Date.now().
//    o Contrastar con la ejecución basada en promesas.

// Simulación de consultas con tiempos específicos
function consultaUsuario(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, nombre: `Usuario ${id}` });
        }, 1200);
    });
}

function consultaSeguridad(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("OK");
        }, 800);
    });
}

function consultaRoles(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["admin", "ventas"]);
        }, 2000);
    });
}

function tiempoTotal(inicio) {
    const fin = Date.now();
    return ((fin - inicio) / 1000).toFixed(2) + " segundos";
}

function registrarResultado(resultado) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Resultado registrado para ${resultado.nombre}`);
            resolve();
        }, 600);
    });
}

// Versión bloqueante (demostración)
function bloqueante() {
    const usuarios = [101, 102, 103, 104];
    console.log("Iniciando versión bloqueante...");
    for (let id of usuarios) {
        // Simulación de operaciones largas
        const usuario = consultaUsuario(id);
        const seguridad = consultaSeguridad(id);
        const roles = consultaRoles(id);
        const tiempos = tiempoTotal(Date.now());
        registrarResultado({ id, nombre: `Usuario ${id}`, seguridad, roles, tiempos });
    }
    console.log("Versión bloqueante finalizada.");
}
// La versión bloqueante no es adecuada porque el programa se congela mientras espera cada operación,
// lo que resulta en una mala experiencia de usuario y baja eficiencia. En esta versión,
// cada consulta se ejecuta secuencialmente, lo que significa que el tiempo total de ejecución será la suma
// de los tiempos de todas las consultas para cada usuario, multiplicado por el número de usuarios.
// Esto no aprovecha la capacidad de ejecutar consultas en paralelo,
// lo que es esencial para mejorar el rendimiento en aplicaciones reales.

// Versión asincrónica con Promesas
function asincronaPromesas() {
    const usuarios = [101, 102, 103, 104];
    console.log("Iniciando versión asincrónica con Promesas...");
    const promesas = usuarios.map((id) => {
        return consultaUsuario(id)
            .then((usuario) => {
                return consultaSeguridad(id).then((seguridad) => {
                    return { ...usuario, seguridad };
                });
            })
            .then((usuarioSeguridad) => {
                return consultaRoles(id).then((roles) => {
                    return { ...usuarioSeguridad, roles };
                });
            })
            .then((resultado) => {
                return registrarResultado(resultado).then(() => resultado);
            });
    });
    Promise.all(promesas).then((resultados) => {
        console.log("Versión asincrónica con Promesas finalizada.");
        console.log(resultados);
    });
}

// Versión final con Async/Await
async function asincronaAsyncAwait() {
    const usuarios = [101, 102, 103, 104];
    console.log("Iniciando versión asincrónica con Async/Await...");
    const resultados = [];
    for (let id of usuarios) {
        const usuario = await consultaUsuario(id);
        const seguridad = await consultaSeguridad(id);
        const roles = await consultaRoles(id);
        const tiempos = tiempoTotal(Date.now());
        const resultado = { ...usuario, seguridad, roles, tiempos };
        await registrarResultado(resultado);
        resultados.push(resultado);
    }
    console.log("Versión asincrónica con Async/Await finalizada.");
    console.log(resultados);
}
// En la versión asincrónica con Async/Await, el código es más legible y fácil de entender,
// ya que se asemeja a un flujo de código síncrono, pero sin bloquear el hilo principal.
// Además, al usar async/await, es más sencillo manejar errores con try/catch,
// lo que mejora la robustez del programa. En comparación con la versión basada en Promesas,
// esta versión es más clara y fácil de mantener, aunque ambas permiten ejecutar consultas en paralelo entre usuarios.

// Ejecutar las versiones
bloqueante();
// asincronaPromesas();
// asincronaAsyncAwait();