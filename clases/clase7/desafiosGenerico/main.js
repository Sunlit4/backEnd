//Desafío generico 1
const express = require ('express') // llamo al archivo del modulo externo instelado

const app = express () 

const frase = 'Hola mundo cómo estan?'

app.get ('/api/frase', (req, res)=>{
    res.json ({
        frase
    })
})

app.get ('/api/letras/:num', (req, res)=>{
    const {num} = req.params
    const letra = frase [num-1]
    console.log(letra)
    res.json({
        letra, 
        num
    })
})

app.get ('/api/palabras/:num', (req, res)=>{
    const {num} = req.params
    const numero = Number(num)
    console.log(isNaN(numero))

    if ((typeof numero === 'number') && (!isNaN (numero))){
        const palabra = frase.split(' ')[ numero-1]
        res.json({
            palabra,
            numero
        })
    }else (
        res.json({
            error: 'El parametro debe ser un numero'
        })
    )
})

//Configuramos el puerto 
const PORT = process.env.PORT || 8080 
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`)
}) // metodo que recibe dos parametros