const fs =require('fs'); 

class Contenedor {
    constructor(filename, keys){
        this._filename = filename;
        this._keys = [...keys, 'id']
        this._readFileOrCreateNewOne();  
    }
    
    _validateKeysExist(newData) {
        
        const objectKeys = Object.keys(newData);
        let exists = true;
        
        objectKeys.forEach((key) => {
          if(!this._keys.includes(key)) {
            exists = false;
          }
        })
        return exists;
    }

    async  _readFileOrCreateNewOne() {
        try {
          await fs.promises.readFile(this._filename, "utf-8");
        } catch (error) {
          error.code === "ENOENT"
            ? this._createEmptyFile()
            : console.log(
                `Error Code: ${error.code} | There was an unexpected error when trying to read ${this._filename}`
              );
        }
      }
    
    async _createEmptyFile() {
        fs.writeFile(this._filename, "[]", (error) => {
          error
            ? console.log(error)
            : console.log(`File ${this._filename} was created since it didn't exist in the system`);
        });
    }
    
    async save(obj){ 
            try {             
                const allData = await this.getData();
                const parsedData = JSON.parse(allData);
    
                obj.id = parsedData.length + 1;
                parsedData.push(obj);
    
                await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
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
            const parsedData = JSON.parse(data);
            const objectIdToBeRemoved = parsedData.find((producto) => producto.id === id);

            if (objectIdToBeRemoved){
                const index = parsedData.indexOf(objectIdToBeRemoved);
                parsedData.splice(index, 1);
                await fs.promises.writeFile(this._filename, JSON.stringify(parsedData))
                return true
            } else {
                console.log (`El ID ${id} no existe en el archivo`)
                return null
            }
        }catch (error){
            console.log(`Se ha producido un error al intentar eliminar un elemento por su ID ${id}`)
        }
    }

    //actualizar producto
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
                const {title, price, image} = newData;

                parsedData[index]['title'] = title;
                parsedData[index]['price'] = price;
                parsedData[index]['image'] = image;
                await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
                return true;
            } else {
                return {error: 'no existe el producto'}
            }
        }catch (error){
            console.log(error)
        }
        
    }

    async addToArrayById (id, objectToAdd){
        if(this._validateKeysExist(objectToAdd)) {
            try {
                id = Number(id);
                const data = await this.getData();
                const parsedData = JSON.parse(data);
                const objectIdToBeUpdated = parsedData.find(
                (producto) => producto.id === id
                );
                if (objectIdToBeUpdated) {
                const index = parsedData.indexOf(objectIdToBeUpdated);
              
                const valorActual = parsedData[index][objectKey];
              
                const newArray = [...valorActual, objectToAdd[objectKey]];
            
                parsedData[index][objectKey] = newArray;
              
                await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
                return true;
                }else {
                    console.log(`ID ${id} does not exist in the file`);
                    return false;
                }
            } catch (error) {
                `Error Code: ${error.code} | There was an error when trying to update an element by its ID (${id})`
            }
        }else {
            return false;
        }
    }
    
    async removeFromArrayById(id, objectToRemoveId, keyName){
        try{
            id=Number(id)
            const data = await this.getData();
            const parsedData = JSON.parse(data);

            const objectIdToBeUpdated = parsedData.find(
                (producto) => producto == id
            );

            if (objectIdToBeUpdated){
                const index = parsedData.indexOf(objectIdToBeUpdated)
                const valorActual = parsedData[index][keyName];
                let indexToBeRemoved = -1;
                valorActual.forEach((element, indexE)=>{
                    if(element.id == objectToRemoveId){
                        indexToBeRemoved = indexE
                    }
                })
                const newArray = [...valorActual];

                if (indexToBeRemoved >-1){
                    console.log(indexToBeRemoved)
                    newArray.splice(indexToBeRemoved,1)
                }

                parsedData[index][keyName] = newArray; 
                await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
                return true; 
            }else{
                console.log(`ID ${id} does not exist in the file`);
                return false
            }
        }catch(error){
            console.log( `Error Code: ${error.code} | There was an error when trying to update an element by its ID (${id})`);
        }
    }

    async deleteAll(){
        try{
            await this._createEmptyFile();
        }catch (error){
            console.log(`There was an error (${error.code}) when trying to delete all the objects`)
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
        const data = await fs.promises.readFile(this._filename, "utf-8");
        return data;
    }
}

module.exports = Contenedor;