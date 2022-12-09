const axios = require('axios');

const getData = async () =>{
    const getProducts = await axios.get('http://localhost:8080/api/productos');
    console.log({
        status: getProducts.status,
        data: getProducts.data
    })
}

getData();