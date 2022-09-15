import ContenedorArchivo from "../../containers/ContenedorArchivo.js";
import fs from 'fs';

let arrayObj = [];

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super('db/productos.json');
    }

    async createNewProduct (newProduct){
        try{
            const data = await this.getAll();
            if (data === false) {
              // Si el array está vacio
              newProduct.id = id; // Le agrega el 'id' 1
              newProduct.timestamp = Date.now(); // Le agrega el timestamp
              arrayObj.push(newProduct); // Carga el primer carrito
              await fs.promises.writeFile(
                this.path,
                JSON.stringify(arrayObj, null, 2)
              );
            } else {
              // Si no está vacio
              let lastItem = data[data.length - 1]; // Encuentra el 'id' del último elemento del array
              newProduct.id = lastItem.id + 1; // Le suma 1
              newProduct.timestamp = Date.now(); // Le agrega el 'timestamp'
              data.push(newProduct); // Lo carga
              await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
            }
            return newProduct;
          } catch (err) {
            return err;
          }
    }

    async editProduct(array, id, product){
        try{
            // Busca el producto según su 'id'
            const index = array.findIndex((item) => item.id == id); 
            // Elimina el producto que se quiere editar
            array = array.filter((item) => item.id != id); 
        
            product.id = parseInt(id); // Agrega el 'id' al producto
            product.timestamp = Date.now(); // Agrega el 'timestamp'
            array.splice(index, 0, product); 

            await fs.promises.writeFile(this.path, JSON.stringify(array, null, 2));
            return product;
        }catch (error){
            return error;
        }
    }

    async deleteById(id){
        try{
            const obj = await this.getById(id); // Trae el producto según su 'id'
            if (obj === null){
                return false
            }else{
                const data = await this.getAll(); // Trae el array de productos
                if(data){
                    const newArray = data.filter((item) => item.id != obj.id) //Se elimina el producto que encontro por su id y modifica el array
                    await fs.promises.writeFile(
                        this.path, 
                        JSON.stringify(newArray, null, 2)
                    );
                    return true;
                }
            }
        }catch(error){
            return error
        }
    }
}
export {ProductosDaoArchivo};