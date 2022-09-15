import ContenedorFirebase from "../../containers/ContenedorFirebases.js"

class CarritosDaoFirebase extends ContenedorFirebase{
    constructor(){
        super("carritos")
    }
}

export { CarritosDaoFirebase };