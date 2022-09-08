# Lista de comandos utilizados
- Para crear la base de datos 

use ecommerce

- Para crear las collecciones 

db.createCollection('productos')
db.createCollectio('mensajes')

- Insertar los documentos a productos

db.productos.insertMany([ {title: 'Lapicera',price: 150,thumbnail: "somosUrl.com"},{title: 'Pilas',price: 342,thumbnail: "somosUrl.com"},{title: 'Hojas A4',price: 1782, thumbnail: "somosUrl.com" },{title: 'iPad', price: 4385,thumbnail: "somosUrl.com"},{title: 'Lentes', price: 1965, thumbnail: "somosUrl.com"},{title: 'Teclado para computadora', price: 1780, thumbnail: "somosUrl.com"},{title: 'Lapiceras de colores', price: 307, thumbnail: "somosUrl.com"},{title: 'Engrampadora',price: 200, thumbnail: "somosUrl.com"},{title: 'Alexa', price: 3500,thumbnail: "somosUrl.com" },{title: 'Cartuchera',price: 560, thumbnail: "somosUrl.com" }])

*Respuesta:*

{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("631a38b12fd0338661cbf12f"),
                ObjectId("631a38b12fd0338661cbf130"),
                ObjectId("631a38b12fd0338661cbf131"),
                ObjectId("631a38b12fd0338661cbf132"),
                ObjectId("631a38b12fd0338661cbf133"),
                ObjectId("631a38b12fd0338661cbf134"),
                ObjectId("631a38b12fd0338661cbf135"),
                ObjectId("631a38b12fd0338661cbf136"),
                ObjectId("631a38b12fd0338661cbf137"),
                ObjectId("631a38b12fd0338661cbf138")
        ]
}

- Insertar los documentos a mensaje

db.mensajes.insertMany([{email: "sonsoles@gmail.com", message: "Hola", date: "07/09/2022 20:30:00"},{email: "cl20@gmail.com", message: "Hola, ¿Cómo estas?", date: "07/09/2022 20:30:10"},{email: "sonsoles@gmail.com",message: "Bien y vos?", date: "07/09/2022 20:31:20"},{email: "cl20@gmail.com", message: "Bien muy bien", date: "07/09/2022 20:32:15"},{email: "sonsoles@gmail.com", message: "Necesitas que te ayude en algo?", date: "07/09/2022 20:32:51"},{email: "cl20@gmail.com", message: "No, gracias estoy viendo los productos", date: "07/09/2022 20:33:08"},{email: "cl20@gmail.com", message: "Si tengo alguna duda, te aviso", date: "07/09/2022 20:34:00"},{email: "sonsoles@gmail.com", message: "Perfecto, ya sabes donde encontrarme", date: "07/09/2022 20:34:30"},{email: "cl20@gmail.com",message: "Adios", date: "07/09/2022 20:35:24"},{email: "sonsoles@gmail.com", message: "Hasta luego", date: "07/09/2022 20:35:44"}])

*Respuesta:* 

{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("631a479aa0b12e8b629a4b28"),
                ObjectId("631a479aa0b12e8b629a4b29"),
                ObjectId("631a479aa0b12e8b629a4b2a"),
                ObjectId("631a479aa0b12e8b629a4b2b"),
                ObjectId("631a479aa0b12e8b629a4b2c"),
                ObjectId("631a479aa0b12e8b629a4b2d"),
                ObjectId("631a479aa0b12e8b629a4b2e"),
                ObjectId("631a479aa0b12e8b629a4b2f"),
                ObjectId("631a479aa0b12e8b629a4b30"),
                ObjectId("631a479aa0b12e8b629a4b31")
        ]
}

- Para listar los productos

db.productos.find().pretty()

*Respuesta:* 

{
        "_id" : ObjectId("631a38b12fd0338661cbf12f"),
        "title" : "Lapicera",
        "price" : 150,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf130"),
        "title" : "Pilas",
        "price" : 342,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf131"),
        "title" : "Hojas A4",
        "price" : 1782,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf132"),
        "title" : "iPad",
        "price" : 4385,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf133"),
        "title" : "Lentes",
        "price" : 1965,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf134"),
        "title" : "Teclado para computadora",
        "price" : 1780,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf135"),
        "title" : "Lapiceras de colores",
        "price" : 307,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf136"),
        "title" : "Engrampadora",
        "price" : 200,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf137"),
        "title" : "Alexa",
        "price" : 3500,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf138"),
        "title" : "Cartuchera",
        "price" : 560,
        "thumbnail" : "somosUrl.com"
}

- Para listar los mensajes 

db.mensajes.find().pretty()

*Respuesta:*

{
        "_id" : ObjectId("631a479aa0b12e8b629a4b28"),
        "email" : "sonsoles@gmail.com",
        "message" : "Hola",
        "date" : "07/09/2022 20:30:00"
}
{
        "_id" : ObjectId("631a479aa0b12e8b629a4b29"),
        "email" : "cl20@gmail.com",
        "message" : "Hola, ¿Cómo estas?",
        "date" : "07/09/2022 20:30:10"
}
{
        "_id" : ObjectId("631a479aa0b12e8b629a4b2a"),
        "email" : "sonsoles@gmail.com",
        "message" : "Bien y vos?",
        "date" : "07/09/2022 20:31:20"
}
{
        "_id" : ObjectId("631a479aa0b12e8b629a4b2b"),
        "email" : "cl20@gmail.com",
        "message" : "Bien muy bien",
        "date" : "07/09/2022 20:32:15"
}
{
        "_id" : ObjectId("631a479aa0b12e8b629a4b2c"),
        "email" : "sonsoles@gmail.com",
        "message" : "Necesitas que te ayude en algo?",
        "date" : "07/09/2022 20:32:51"
}
{
        "_id" : ObjectId("631a479aa0b12e8b629a4b2d"),
        "email" : "cl20@gmail.com",
        "message" : "No, gracias estoy viendo los productos",
        "date" : "07/09/2022 20:33:08"
}
{
        "_id" : ObjectId("631a479aa0b12e8b629a4b2e"),
        "email" : "cl20@gmail.com",
        "message" : "Si tengo alguna duda, te aviso",
        "date" : "07/09/2022 20:34:00"
}
{
        "_id" : ObjectId("631a479aa0b12e8b629a4b2f"),
        "email" : "sonsoles@gmail.com",
        "message" : "Perfecto, ya sabes donde encontrarme",
        "date" : "07/09/2022 20:34:30"
}
{
        "_id" : ObjectId("631a479aa0b12e8b629a4b30"),
        "email" : "cl20@gmail.com",
        "message" : "Adios",
        "date" : "07/09/2022 20:35:24"
}
{
        "_id" : ObjectId("631a479aa0b12e8b629a4b31"),
        "email" : "sonsoles@gmail.com",
        "message" : "Hasta luego",
        "date" : "07/09/2022 20:35:44"
}

- Para saber la cantidad de los documentos en ambas colecciones

db.productos.estimatedDocumentCount()
10

db.mensajes.estimatedDocumentCount()
10

- Agregar otro producto 

 db.productos.insertOne({title:"Cuaderno oficio", price: 387, thumbnail:"somosUrl.com"})

*Respuesta:* 

{
        "acknowledged" : true,
        "insertedId" : ObjectId("631a4a7ea0b12e8b629a4b32")
}

- Listar productos con precio menor a 1000 pesos:

db.productos.find({price: {$lt: 1000}}).pretty()

*Respuesta:*

{
        "_id" : ObjectId("631a38b12fd0338661cbf12f"),
        "title" : "Lapicera",
        "price" : 150,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf130"),
        "title" : "Pilas",
        "price" : 342,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf135"),
        "title" : "Lapiceras de colores",
        "price" : 307,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf136"),
        "title" : "Engrampadora",
        "price" : 200,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf138"),
        "title" : "Cartuchera",
        "price" : 560,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a4a7ea0b12e8b629a4b32"),
        "title" : "Cuaderno oficio",
        "price" : 387,
        "thumbnail" : "somosUrl.com"
}

- Listar los productos con precio entre los 1000 a 3000 pesos. 

 db.productos.find({price: {$gt: 1000, $lt: 3000}}).pretty()

*Respuesta:* 

{
        "_id" : ObjectId("631a38b12fd0338661cbf131"),
        "title" : "Hojas A4",
        "price" : 1782,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf133"),
        "title" : "Lentes",
        "price" : 1965,
        "thumbnail" : "somosUrl.com"
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf134"),
        "title" : "Teclado para computadora",
        "price" : 1780,
        "thumbnail" : "somosUrl.com"
}

- Listar los productos con precio mayor a 3000

 db.productos.find({price: {$gt: 3000}})

*Respuesta:*

{ "_id" : ObjectId("631a38b12fd0338661cbf132"), "title" : "iPad", "price" : 4385, "thumbnail" : "somosUrl.com" }
{ "_id" : ObjectId("631a38b12fd0338661cbf137"), "title" : "Alexa", "price" : 3500, "thumbnail" : "somosUrl.com" }

- Realizar una consulta que traiga sólo el nombre del tercer producto más barato 

db.productos.find({},{title:1, _id:0}).sort({price:1}).skip(2).limit(1)

*Respuesta:*

{ "title" : "Lapiceras de colores" }

- Hacer una actualización sobre todo los productos, agregando el campo stock a todos ellos con un valor de 100
db.productos.updateMany({}, {$inc: {stock: 100}})

*Respuesta:*

{ "acknowledged" : true, "matchedCount" : 11, "modifiedCount" : 11 }

- Cambiar el stock a cero de los productos con precios mayores a 4000

 db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}})

*Respuesta:*
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

- Mostrar los productos con los cambios de stock

db.productos.find().pretty()

*Respuesta:*

{
        "_id" : ObjectId("631a38b12fd0338661cbf12f"),
        "title" : "Lapicera",
        "price" : 150,
        "thumbnail" : "somosUrl.com",
        "stock" : 100
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf130"),
        "title" : "Pilas",
        "price" : 342,
        "thumbnail" : "somosUrl.com",
        "stock" : 100
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf131"),
        "title" : "Hojas A4",
        "price" : 1782,
        "thumbnail" : "somosUrl.com",
        "stock" : 100
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf132"),
        "title" : "iPad",
        "price" : 4385,
        "thumbnail" : "somosUrl.com",
        "stock" : 0
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf133"),
        "title" : "Lentes",
        "price" : 1965,
        "thumbnail" : "somosUrl.com",
        "stock" : 100
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf134"),
        "title" : "Teclado para computadora",
        "price" : 1780,
        "thumbnail" : "somosUrl.com",
        "stock" : 100
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf135"),
        "title" : "Lapiceras de colores",
        "price" : 307,
        "thumbnail" : "somosUrl.com",
        "stock" : 100
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf136"),
        "title" : "Engrampadora",
        "price" : 200,
        "thumbnail" : "somosUrl.com",
        "stock" : 100
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf137"),
        "title" : "Alexa",
        "price" : 3500,
        "thumbnail" : "somosUrl.com",
        "stock" : 100
}
{
        "_id" : ObjectId("631a38b12fd0338661cbf138"),
        "title" : "Cartuchera",
        "price" : 560,
        "thumbnail" : "somosUrl.com",
        "stock" : 100
}
{
        "_id" : ObjectId("631a4a7ea0b12e8b629a4b32"),
        "title" : "Cuaderno oficio",
        "price" : 387,
        "thumbnail" : "somosUrl.com",
        "stock" : 100
}

- Borrar los productos con precio menor a 1000 
db.productos.deleteMany({price: {$lt: 1000}})

*Respuesta:*
{ "acknowledged" : true, "deletedCount" : 0 }

- Crear un usuario 'pepe' clave: 'asd456' que solo pueda leer la base de datos ecommerce
db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]})

*Respuesta:*
Successfully added user: {
        "user" : "pepe",
        "roles" : [
                {
                        "role" : "read",
                        "db" : "ecommerce"
                }
        ]
}

