// Ejercicio integrador 1:
// Simular un proceso de “consulta de usuario”, que requiere:

// “Buscar usuario” (promesa de 1 segundo)
// “Consultar permisos” (promesa de 2 segundos)
// “Generar reporte final” (promesa de 1 segundo)
// Realizarlo en tres versiones:
// • Con callbacks
// • Con promesas
// • Con async/await

// Meta: identificar ventajas y desventajas reales de cada técnica.


//primera version con callbacks

//primera function que nos sirve para buscar el usuario
//recibe 2 parametros
console.log("---------------ejemplo utilizando callback------------");

function buscarUsuario(id, callback) {
    setTimeout (() => {
        console.log("usuario encontrado");
        //se ejcuta la funcion con el id qie se le pasa, y se le asigna el id como dato
        callback(id)
    }, 1000)
}

//segunda function que utilizmos para consultar los permisos
//recibe dos parametros
function consultarPermisos(id, callback) {
    setTimeout (() => {
        console.log("permisos consultados para ID: " + id);
        callback("admin");

    }, 2000)
}

//3function utilizada para generar el reporte final
function reporteFinal(permiso, callback) {
    setTimeout (() =>{
        console.log("resporte generado para: " + permiso);
        callback();
        
    }, 1000)
    
}

//ejecucion
buscarUsuario(10, (id) => {
    consultarPermisos(id, (permiso) => {
        reporteFinal(permiso, () => {
            console.log("proceso completado");
            
        })
    })
})

//seguna version con promise

console.log("----------------ejemplo utilizando promise------------");


const buscarU  = (id) => new Promise(resolve => setTimeout (() => {
    console.log("usuario encontrado: "); resolve(id)
    
}, 1000));

const consultarP = (id) => new Promise(resolve => setTimeout (() => {
    console.log("permisos ok"), resolve("admin");
    
}, 2000));

const reporteF = (permiso) => new Promise(resolve => setTimeout (() => {
    console.log("reporte ok: "); resolve();
    
}, 1000));

//ejecucion

buscarU(10)
.then(id => consultarP(id))
.then(permiso => reporteF(permiso))
.then(() => console.log("procesos completado"));

//tercera version con async-await

console.log("---------------ejmemplo con async-await------------");

async function procesoFinal() {

    const id = await buscarU(10);
    const permiso = await consultarP(id)
    const reporte = await reporteF(permiso)

    console.log("permisos obtenidos: " + permiso);
    
}

procesoFinal();