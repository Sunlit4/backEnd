import connectMongo from "../config/db.js"

class MongoDao {
    constructor(url, model){
        this.url = url
        this.model = model;
        this.conexion();
    }

    async conexion(){
        await connectMongo()
    }

    async save(obj){
        try{
            let guardar = new this.model(obj); 
            await guardar.save();
        }catch (err){
            throw new Error(err?.message);
        }
    }

    async getById(id){
        try{
            let datos = await this.model.findOne({_id: id})
            let newDatos = {...datos._doc, id: datos._id.toString()}
            return newDatos
        }catch (err){
            throw new Error(err?.message);
        } 
    }

    async getAll(){
        try{
            return await this.model.find({});
        }catch(err){
            throw new Error(err?.message);
        }
    }

    async create(item){
        try{
            const newItem = new this.model(item);
            await newItem.save();
            return newItem;
        }catch (err){
            throw new Error(err?.message);
        }
    }

    async updateById(id, item){
        try{
            return await this.model.findByIdAndUpdate(id, item);
        }catch(err){
            throw new Error(err?.message);
        }
    }

    async deleteById(id){
        try{
            const item = await this.getById(id);
            await this.model.deleteOne({_id: id});
            return item;
        }catch(err){
            throw new Error(err?.message);
        }
    }
}

export default MongoDao;