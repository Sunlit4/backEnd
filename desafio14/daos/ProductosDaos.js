const Contenedor = require('./contenedor.js')

class ProductosDaos extends Contenedor {
    constructor() {
        super('../DB/productos.model.js')
    }
}

module.exports = ProductosDaos