const mongoose = require("mongoose");
require('dotenv').config()

const connection = async()=>{
    try{
        const url = process.env.MONGOURL
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }catch(error){
        console.error(error)
    }
}

module.exports = {
    connection
}