import ContenedorArchivo from "../../containers/ContenedorArchivo.js";
import fs from 'fs';

let arrayObj = [];

class CarritoDaoArchivo extends ContenedorArchivo {
    constructor(){
        super('db/carrito.json');
    }
    async createNewCart(cart){
        try{
            const data = await this.getAll();
            if (data === false){
                cart.id = id;
                cart.timestamp = Date.now();
                arrayObj.push(cart);
                await fs.promises.writeFile(
                    this.path, 
                    JSON.stringify(arrayObj, null, 2)
                );
            }else{
                let lastItem = data[data.length - 1];
                cart.id = lastItem.id + 1; 
                cart.timestamp = Date.now();
                data.push(cart);
                await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2))
            }
            return cart
        }catch (error){
            return error
        }
    }
     async createNewProduct(id, newProduct) {
    try {
      let array = await this.getAll();
      if (array === false) {
        return undefined; // No hay carritos en el array
      }else {
        const data = await this.getById(id);
        if (data === null) {
          return false; // No encontró el carrito
        } else {
          array = array.filter((item) => item.id != data.id); // Borramos el carrito que matcheó
          if (data.productos.length > 0) {
            let lastItem = data.productos[data.productos.length - 1]; // Encuentra el 'id' del último elemento del array
            newProduct.id = lastItem.id + 1; // Le suma 1
          } else {
            newProduct.id = 1;
          }
          newProduct.timestamp = Date.now(); // Le agregamos el 'timestamp'
          data.productos.push(newProduct); // Lo carga al array de productos del carrito
          array.push(data); // Cargamos ese array de productos al array de carritos
          array.sort((a, b) => a.id - b.id);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(array, null, 2)
          );
        }
        return newProduct;
      }
    } catch (err) {
      return err;
    }
  }

  async createNewProduct(ID, newProduct){
    try{
        let array = await this.getAll();
        if (array === false){
            return undefined;
        }else{
            const data = await this.getById(id);
            if (data === null){
                return false; // No encontró el carrito
            }else{
                array = array.filter((item) => item.id != data.id); 
                if (data.productos.length > 0){
                    let lastItem = data.productos[data.productos.length - 1];
                    newProduct.id = lastItem.id + 1;
                }else{
                    newProduct.id = 1;
                }
                newProduct.timestamp = Date.now(); 
                data.productos.push(newProduct); 
                array.push(data); // Cargamos ese array de productos al array de carritos
                array.sort((a, b) => a.id - b.id);
                await fs.promises.writeFile(this.path, JSON.stringify(array, null, 2))
            }
            return newProduct;
        }
    }catch(error){
        return error
    }
  }

  async getProductsByCartId(id){
    try{
        const data = await this.getAll();
        if(data === false){//No hay ningun carrito
            return false;
        }else{ //Existen carritos
            const cart = data.find ((obj)=>obj.id==id);
            if (cart.productos.length > 0){
                return cart; 
            }else{
                return null
            }
        }
    }catch(error){
        return error
    }
  }

  async deleteProductOfCartById(cart_id, prod_id){
    try{
        let array = await this.getAll();
        if (array == false){
            return false; 
        }else{
            let data = await this.getById(cart_id);
            if(data === null){
                return null
            }else{
                array = array.filter((item) => item.id != cart_id); // Eliminamos el carrito que coincidió
                if (data.productos.find((item) => item.id == prod_id) === undefined){
                    return undefined
                }else{
                    data.productos = data.productos.filter(
                        (item) => item.id != prod_id
                    )
                    array.push(data);
                    array.sort((a, b) => a.id - b.id);
                    await fs.promises.writeFile(this.path,JSON.stringify(array, null, 2));
                    return true
                }
            }
        }        
    }catch (error){
        return error
    }
  }

  async deleteById(id){
    try{
        const cart = await this.getById(id); 
        if (cart === null){
            return false;
        }else{
            let data = await this.getAll();
            if(data === false){
                return null
            }else{
                data = data.filter((item)=>item.id != cart.id);
                await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2))
                return true;
            }
        }
    }catch(error){
        return error
    }
  }
}

export { CarritoDaoArchivo };