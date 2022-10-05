const Contenedor = require('../contenedores/contenedor.js')
const generarProductos = require('../utils/generador-productos.js')
const generarIds = require('../utils/generador-ids.js')

class ApiProductosMocks extends Contenedor{
    constructor() {super()}

    crearProductos(cant = 5) {
        const nuevos = []
        for (let i = 0; i < cant; i++) {
          const nuevoProducto = generarProductos(generarIds())
          const guardado = this.save(nuevoProducto)
          nuevos.push(guardado)
        }
    return nuevos
    }
}

module.exports = ApiProductosMocks; 
