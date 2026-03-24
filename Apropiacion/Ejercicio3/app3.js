//manejo de asincronia con callbacks

function procesarPedido (callback) { //se crea la funcion con su funcion callback como parametro
    console.log("Pedido recibido...");
    
    setTimeout(() => { //se crea, más no se ejecuta
        console.log("Preparando pedido...");
        callback() // se ejecuta el callback despues de tres segundos
    },3000)
}

procesarPedido(() => { //llamamos a la funcion e imprimmos por pantalla un mensaje final
    console.log("Pedido entregado..."); 
})