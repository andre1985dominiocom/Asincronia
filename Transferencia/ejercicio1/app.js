// Enunciado
// Un módulo de soporte registra solicitudes de usuarios. Cada solicitud tarda un tiempo distinto en ser atendida. Aunque el sistema atiende cada solicitud por turno (una a la vez), el aprendiz debe simular el tiempo de espera, registrar el orden de atención y calcular la duración total del proceso.

// Requerimientos
// • Procesar solicitudes de manera secuencial.
// • Registrar inicio y fin de cada atención.
// • Identificar el tiempo total del proceso.
// • Usar asincronía controlada (callback, promesa o async/await).

// Datos de entrada
// • Lista de usuarios con un tiempo estimado de atención.

// Datos de salida
// • Orden real de atención.
// • Tiempo de atención por usuario.
// • Tiempo total del proceso.

// Lista de usuarios con su tiempo estimado de atención (en milisegundos)
const solicitudes = [
  { usuario: "michael", tiempo: 1000 },
  { usuario: "juan esteban", tiempo: 2000 },
  { usuario: "lucho", tiempo: 1500 }
];

// Función que atiende una solicitud
async function atenderSolicitud(solicitud) {
  console.log(`Inicio atención: ${solicitud.usuario}`); 
  
  // Simulamos el tiempo de atención con setTimeout dentro de una Promesa
  await new Promise(res => setTimeout(res, solicitud.tiempo));
  
  console.log(`Fin atención: ${solicitud.usuario} (duración: ${solicitud.tiempo/1000} seg)`);
  
  // Retornamos el tiempo de atención para acumularlo
  return solicitud.tiempo;
}

// Función principal que procesa todas las solicitudes
async function procesarSolicitudes(lista) {
  let tiempoTotal = 0;

  for (const solicitud of lista) {
    // Procesamos cada solicitud de manera secuencial
    const tiempo = await atenderSolicitud(solicitud);
    tiempoTotal += tiempo;
  }

  console.log(`Tiempo total del proceso: ${tiempoTotal/1000} seg`);
}

// Ejecución
procesarSolicitudes(solicitudes);
