//1 Desafío de la clase 'Proyecto en Node'
//Crear un proyecto en node.js que genere 10000 números aleatorios en el rango de 1 a 20
/* Crear un objeto cuyas claves sean lo nros. salidos y el valor asociado a cada
clave será la cantidad de veces que salió dicho número. Representar por consola los resultados */

/*let obj = {}

const agregar = (numero) =>{
    if (typeof obj[numero] === 'undefined'){
        obj[numero] = 1

    }else {
        obj[numero] += 1
    }

}
Math.random() // genera números aleatorios
for (let index=0; index < 1000; index++){
    const element = Math.ceil(Math.random() * 20)
    agregar(element)
}

console.log (obj)*/
 
// Desafio 2 Crear un array 
const MajnejarArray = require('./array')
const arrayProductos = new MajnejarArray()
console.log (arrayProductos.getArray().reduce((count, producto) => count += producto.precio , 0).toFixed(2))
