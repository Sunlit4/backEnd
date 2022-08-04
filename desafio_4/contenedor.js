const fs = require('fs')
class Contenedor {
    constructor(ruta){
        this.ruta = ruta       
    }   

    async  _readFileOrCreateNewOne() {
        try {
          await fs.promises.readFile(this.ruta, "utf-8");
        } catch (error) {
          error.code === "ENOENT"
            ? this._createEmptyFile()
            : console.log(
                `Error Code: ${error.code} | There was an unexpected error when trying to read ${this._filename}`
              );
        }
      }
    
    async _createEmptyFile() {
        fs.writeFile(this.ruta, "[]", (error) => {
          error
            ? console.log(error)
            : console.log(`File ${this.ruta} was created since it didn't exist in the system`);
        });
    }
    
    async save(obj){ 
        try {             
            const allData = await this.getData();
            const parsedData = JSON.parse(allData);

            obj.id = parsedData.length + 1;
            parsedData.push(obj);

            await fs.promises.writeFile(this.ruta, JSON.stringify(parsedData));
            return obj.id;
        } catch (error) {
            console.log(error)
        }            
    }

    //traer producto por id
    async getById(id){
        id = Number (id);
        try{
            const data = await this.getData();
            const dataParse = JSON.parse(data);
            return dataParse.find((producto) => producto.id === id);
        }catch(error){
            console.log (`Hubo un error al intentar obtener un producto por su ID ${id}`)
        }
    }

    // eliminar producto por id
    async deleteById(id){
        try {
            id = Number(id);
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

    async updateById(id, newData){
        try {
            id = Number(id);
            const data = await this.getData();
            const parsedData = JSON.parse(data);
            const objectIdToBeUpdated = parsedData.find(
                (producto) => producto.id === id
            );

            if (objectIdToBeUpdated) {
                const index = parsedData.indexOf(objectIdToBeUpdated);
                const {title, price, thumbnail} = newData;

                parsedData[index]['title'] = title;
                parsedData[index]['price'] = price;
                parsedData[index]['thumbnail'] = thumbnail;
                await fs.promises.writeFile(this.ruta, JSON.stringify(parsedData));
                return true;
            } else {
                return {error: 'no existe el producto'}
            }
        }catch (error){
            console.log(error)
        }
    }

    //traer los productos
    async getAll(){
        try {            
            const data = await this.getData();
            return JSON.parse(data);
        } catch (error) {
            console.log(error)
        }
    }

    async getData() {
        const data = await fs.promises.readFile(this.ruta, "utf-8");
        return data;
    }
}

module.exports = Contenedor;
