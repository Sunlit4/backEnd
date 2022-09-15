import fs from 'fs';

class ContenedorArchivo {
    constructor(path){
        this.path = path;
    }

    async getById (id){
        try{
            const data = await this.getAll()
            const cart = data.find((obj)=>obj.id == id);
            if (cart){
                return cart
            }else{
                return null;
            }
        }catch(error){
            return error;
        }
    }

    async getAll(){
        try{
            const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
            //si el array no esta vacio
            if (data.length > 0){
                return data 
            }else{
                return false //array vacio
            }
        }catch (error){
            return error;
        }
    }
}

export default ContenedorArchivo;