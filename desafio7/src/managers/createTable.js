const { knex } = require ('./conexionDB')

const knexProductos = require ('knex')(knex)

knexProductos.schema.createTable('productos', table =>{
    table.increments('id')
    table.string('title')
    table.float('price')
    table.string('thumbnail')
})
.then(()=> console.log('table-created'))
.catch((err)=>{console.log(err); throw err })
.finally(()=> knexProductos.destroy())

//---------------------------CHAT----------------------//


