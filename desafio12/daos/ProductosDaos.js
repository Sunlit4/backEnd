const Contenedor = require('./contenedor.js'); 

class ProductosDaos extends Contenedor{
    constructor(){
        super('../db/productos.model.js')
    }
}

module.exports = ProductosDaos; 