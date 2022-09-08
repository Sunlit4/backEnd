const knex = require('./mariaDB/conexionDB')
const { optionsLite } = require('./SQlite3DB/connection');
const knexChat = require('knex')(optionsLite)

const crearTabla = async (nombreTabla) =>{
    try{
        await knex.schema.createTable(nombreTabla, table =>{
            table.increments('id')
            table.string('title')
            table.integer('price')
        })
        console.log('tabla-creada')
    }catch(error){
        console.log(error)
    }
}

const chatTable = async(messages) =>{
    try{
        await knexChat.schema.createTable(messages, table =>{
            table.increments('id')
            table.string('email')
            table.string('message')
            table.date('date')
        })
        console.log('tabla2-creada')
    }catch(error){
        console.log(error)
    }
}

crearTabla('productos')
chatTable('messages')


