// Lista de paquetes (lo que nos dan)
const paquetes = [
    { id: "P1", tiempo: 3000 },
    { id: "P2", tiempo: 1000 },
    { id: "P3", tiempo: 2000 },
    { id: "P4", tiempo: 1500 }
];

// aquí vamos guardando el orden en que terminan, no en el que empiezan
const orden = [];

// función que simula la entrega de un paquete
function entregar(paquete) {
    return new Promise((resolve, reject) => {

    // simula el tiempo que tarda en entregarse
    setTimeout(() => {

        // le metemos un poco de aleatoriedad (puede fallar)
        const fallo = Math.random() < 0.2;

        if (fallo) {
            console.log(`Falló ${paquete.id}`);

            // guardamos que este paquete terminó (aunque falló)
            orden.push({
                id: paquete.id,
                estado: "fallido"
            });

        reject(`El paquete ${paquete.id} no se pudo entregar`);
        } else {
            console.log(`Entregado ${paquete.id}`);

            orden.push({
                id: paquete.id,
                estado: "ok"
            });

        resolve(`Paquete ${paquete.id} entregado`);
        }

    }, paquete.tiempo);

    });
}


// función principal o en la que vamos a ejecutar el codigo
async function ejecutar() {

    console.log("Arrancando entregas...");

    // creamos todas toditas las promesas de una (esto las va a ejecuta en paralelo)
    const tareas = paquetes.map(p => entregar(p));

    // esperamos a que todas terminen (sin romper si alguna falla)
    const resultados = await Promise.allSettled(tareas);

    console.log("Resultados:");
    console.log(resultados);

    console.log("Orden en que terminaron:");
    console.log(orden);

    // sacamos resumen
    let ok = 0;
    let error = 0;

    resultados.forEach(r => {
        if (r.status === "fulfilled") ok++;
        else error++;
    });

    console.log("\nResumen final:");
    console.log({
        total: paquetes.length,
        entregados: ok,
        fallidos: error
    });

}

// ejecutamos todo
ejecutar();