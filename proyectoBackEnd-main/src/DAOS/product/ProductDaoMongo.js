import { Product } from "../../models/Product.js"; 
import MongoDao from "../../contenedor/BaseDao.js";
import connectMongo from "../../config/db.js"

class ProductDaoMongo extends MongoDao{
    constructor(){
        super(connectMongo, Product);
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new ProductDaoMongo();
        }
        return this.instance;
    }

    async getProductsByCategoryName(category_name){
        try{
            const products = await this.model.find({category: category_name});
            return products;
        }catch(err){
            throw new Error(err?.message);
        }
    }
}

export default ProductDaoMongo; 