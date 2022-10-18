const Contenedor = require('./contenedor.js'); 

class LoginDaos extends Contenedor{
    constructor(){
        super('../db/usuarios.model.js')
    }
}

module.exports = LoginDaos; 