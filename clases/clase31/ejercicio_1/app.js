//COMPRESSION - SE INSTALO npm i compression
const express = require('express')
const compression = require('compression')

const app = express()
const port = 8080


const mensaje = ('Hola que tal').repeat(10000)

app.get('/saludo',(req, res)=>{
    res.send(mensaje)
})

app.get('/saludozip', compression(), (req, res)=>{
    res.send(mensaje)
})

app.listen(port, err => {
    if(err){
        console.log('Error', err)
    }
    console.log('Server is running on port 8080')
})