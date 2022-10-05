const faker = require('@faker-js/faker'); 
faker.locale = 'es'; 

function generarProductos (id){
    return{
        id, 
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }
}

module.exports = generarProductos;