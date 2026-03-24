// 3. Validación de un formulario con múltiples verificaciones externas
// Enunciado
// Un sistema debe validar un formulario realizando tres verificaciones asincrónicas:
// 1. Validar correo en un servicio externo.
// 2. Validar documento en una base remota.
// 3. Validar disponibilidad del usuario en un registro global.
// Las tres validaciones pueden ocurrir en paralelo, pero el sistema solo puede continuar
// si todas responden satisfactoriamente.
//Requerimientos
// • Ejecutar las validaciones en paralelo.
// • Capturar errores individuales y globales.
// • Consolidar un objeto con los estados de validación.
// • Medir el tiempo total del proceso.
// Datos de entrada
// • Datos básicos del usuario (correo, documento, nombre).
// • Tiempos simulados de respuesta de cada verificación.
// Datos de salida
// • Estado individual de cada validación.
// • Resultado final: “Formulario validado” o “Validación fallida”.
// • Tiempo total del proceso.

// Simulación de validaciones asincrónicas
function validarCorreo(correo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (correo.includes('@')) {
                resolve('Correo válido');
            } else {
                reject('Correo inválido');
            }
        }, 1000); // Simula un tiempo de respuesta de 1 segundo
    });
}

function validarDocumento(documento) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (documento.length === 10) {
                resolve('Documento válido');
            } else {
                reject('Documento inválido');
            }
        }, 1500); // Simula un tiempo de respuesta de 1.5 segundos
    });
}

function validarDisponibilidad(nombre) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (nombre !== 'UsuarioNoDisponible') {
                resolve('Usuario disponible');
            } else {
                reject('Usuario no disponible');
            }
        }, 1200); // Simula un tiempo de respuesta de 1.2 segundos
    });
}

// Función principal para validar el formulario
async function validarFormulario(usuario) {
    const inicio = Date.now();
    const resultados = {};
    let formularioValido = true;

    try {
        const [correo, documento, disponibilidad] = await Promise.all([
            validarCorreo(usuario.correo).then(result => resultados.correo = result).catch(error => { resultados.correo = error; formularioValido = false; }),
            validarDocumento(usuario.documento).then(result => resultados.documento = result).catch(error => { resultados.documento = error; formularioValido = false; }),
            validarDisponibilidad(usuario.nombre).then(result => resultados.disponibilidad = result).catch(error => { resultados.disponibilidad = error; formularioValido = false; })
        ]);

        const tiempoTotal = (Date.now() - inicio) / 1000; // Tiempo total en segundos

        console.log('Resultados de validación:', resultados);
        console.log('Tiempo total del proceso:', tiempoTotal, 'segundos');

        if (formularioValido) {
            console.log('Formulario validado');
        } else {
            console.log('Validación fallida');
        }
    } catch (error) {
        console.error('Error en la validación:', error);
    }
}

// Datos de entrada
const usuario1 = {
    correo: 'sergio19855@gmail.com',
    documento: '1098765432',
    nombre: 'sergio'
};

const usuario2 = {
    correo: 'sergio19855gmail.com', // Correo inválido
    documento: '10987654326', // Documento inválido
    nombre: 'UsuarioNoDisponible' // Usuario no disponible
};

// Ejecutar la validación del formulario
validarFormulario(usuario1);
validarFormulario(usuario2);