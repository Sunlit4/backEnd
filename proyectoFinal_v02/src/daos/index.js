//DAO Archivo
import { ProductosDaoArchivo } from "./productos/ProductoDaoArchivo.js";
import { CarritoDaoArchivo } from "./carritos/CarritoDaoArchivo.js";

//MongoDB
import { ProductosDaoMongoDb } from "./productos/ProductosDaoMongo.js";
import { CarritosDaoMongoDb } from "./carritos/CarritoDaoMongo.js";

//Firebase
import {ProductosDaoFirebase} from "./productos/ProductoDaoFirebase.js";
import { CarritosDaoFirebase} from "./carritos/CarritoDaoFirebase.js";

//variables
let productosDao;
let carritosDao;

const PERS = process.env.PERS || "firebase";

switch (PERS){
    case 'archivo':
        productosDao = new ProductosDaoArchivo();
        carritosDao = new CarritoDaoArchivo();
        break;
    case 'mongoDb':
        productosDao = new ProductosDaoMongoDb();
        carritosDao = new CarritosDaoMongoDb();
        break;
    case 'firebase':
        productosDao = new ProductosDaoFirebase();
        carritosDao = new CarritosDaoFirebase();
        break;
}

export {productosDao, carritosDao}