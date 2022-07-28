const fs = require ('fs'); 

class Contenedor {
    constructor(ruta){
        this.ruta = ruta
        this.arrayProductos= [];
    }
    async save(objData){
        try{
            this.arrayProductos = [ ...this.arrayProductos, {...objData, id: this.arrayProductos.length + 1}]
            const contenido = fs.promises.writeFile(this.ruta, JSON.stringify(this.arrayProductos), null, 2, 'utf-8')  
            console.log('contenido guardado')

            //console.log(dataArchivo)
        }catch (error){
            console.log('Hubo un error al intentar guardar un elemento')
        }
    }
    async getById (id){
        try{
            const data = await this.getData();
            const dataParse = JSON.parse(data);
            return dataParse.find((producto) => producto.id === id);
        }catch(error){
            console.log (`Hubo un error al intentar obtener un producto por su ID ${id}`)
        }
    }
    async deleteById (id){
        try {
            const data = await this.getData();
            const parseData = JSON.parse(data);
            const objectIdRemoved = parseData.find((producto) => producto.id === id);

            if (objectIdRemoved){
                const index = parseData.indexOf(objectIdRemoved);
                parseData.splice(index, 1);
                await fs.promises.writeFile(this.ruta, JSON.stringify(parseData))
            } else {
                console.log (`El ID ${id} no existe en el archivo`)
                return null
            }
        }catch (error){
            console.log(`Se ha producido un error al intentar eliminar un elemento por su ID ${id}`)
        }
    }
      async deleteAll(){
        try {
            await fs.promises.unlink(this.ruta)
            return 'borrado\n'
        }catch (error) {
            return `Falla al borrar ${error}`
        }
    }
    async getData() {
        const data=await fs.promises.readFile(this.ruta, 'utf-8');
        return data;
    }
    async getAll(){
        const data = await this.getData();
        return JSON.parse(data);
    }
}

module.exports = Contenedor; 


