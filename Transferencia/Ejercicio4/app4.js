// Simulamos los tiempos de cada proceso 
const tiempos = {
    stock: 2000,
    costos: 1500,
    recomendaciones: 3000,
    factura: 1000
};

// Función para validar stock
function validarStock(idPedido, tiempo) {
    return new Promise((resolve, reject) => {
        console.log("Validando stock...");

    setTimeout(() => {
      const hayStock = true; // se predefine true, pero se puede dejar false para simular un error

        if (hayStock) {
            console.log("Stock validado");
            resolve("Stock OK");
        } else {
            reject("No hay stock");
        }
    }, tiempo);
    });
}

// Función para calcular costos
function calcularCostos(idPedido, tiempo) {
    return new Promise((resolve) => {
        console.log("Calculando costos...");

    setTimeout(() => {
        console.log("Costos calculados");
        resolve("Costo total: $100");
    }, tiempo);
    });
}

// Función opcional (no bloquea)
function generarRecomendaciones(idPedido, tiempo) {
    console.log("Generando recomendaciones (en paralelo)...");

    setTimeout(() => {
        console.log("Recomendaciones listas");
    }, tiempo);
}

// Función para enviar factura
function enviarFactura(idPedido, tiempo) {
    return new Promise((resolve) => {
        console.log("Enviando factura...");

        setTimeout(() => {
            resolve("Factura generada correctamente");
            console.log("Factura enviada");
        }, tiempo);
    });
}

// Flujo principal
async function procesarPedido(idPedido) {
    console.log(`Procesando pedido: ${idPedido}\n`);

    try {
        // desde aca corre en paralelo
        generarRecomendaciones(idPedido, tiempos.recomendaciones);

        const stock = await validarStock(idPedido, tiempos.stock);

        const costos = await calcularCostos(idPedido, tiempos.costos);

        // Solo si todo lo anterior salió bien
        const factura = await enviarFactura(idPedido, tiempos.factura);

        console.log("RESULTADOS FINALES:");
        console.log(stock);
        console.log(costos);
        console.log(factura);

    } catch (error) {
        console.log("ERROR EN EL PROCESO:");
        console.log(error);
    }
}

// Ejecutamos
procesarPedido(123);