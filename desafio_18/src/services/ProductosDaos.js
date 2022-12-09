const Contenedor = require('../DAO/contenedor.js')

class ProductosDaos extends Contenedor {
    constructor() {
        super('../models/productos.model.js')
    }
}

module.exports = ProductosDaos