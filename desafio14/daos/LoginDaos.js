const Contenedor = require('./contenedor.js')

class LoginDaos extends Contenedor {
    constructor() {
        super('../DB/usuarios.model.js')
    }


}



module.exports = LoginDaos
