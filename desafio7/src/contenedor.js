const knex = require('./mariaDB/conexionDB')

class Contenedor{
    constructor(knex, table){
        this.knex = knex;
        this.table = table; 
    }

    async getAll(){
        try{
            const products = await this.knex.from(this.table).select('*');
            return products
        }catch(error){
            throw error
        }
    }

    async getById(){
        try{
            const producto = await this.knex.from(this.table).select('*').where('id', id);
            if (producto.length <= 0){
                return null;
            }
            return producto;
        }catch(error){
            throw error
        }
    }

    async save (obj){
        try{
            const product = await this.knex(this.table).insert(
                {
                    title: obj.title, 
                    price: obj.price
                }
            )
            return product;
        }catch(error){
            throw error;
        }
    }

    async deleteAll(){
        try {
            const product = await this.knex(this.table).del('*')
            return product;
        }catch(error){
            throw error;
        }
    }

    async deleteById(id){
        try {
            const product = await this.knex(this.table).where({id: id}).del()
            return product;
        }catch (error){
            throw error;
        }
    }

    async update(id, title, price){
        try{
            const product = await knex(this.table).where({id: id}).update({title: title, price: price})
            return product
        }catch (error){
            throw error
        }
    }
}

module.exports = Contenedor;