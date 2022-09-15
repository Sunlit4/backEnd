const express = require ('express') // llamo al archivo del modulo externo instelado

const app = express () 

app.use(express.json())

//Ejemplo de petición GET con identificador, acceder a un recurso en particular ya conocido.
/*id será un parametro dinamico donde capturo lo que venga de la url 
http://localhost:8080/api/mensajes/3 */

app.get('/api/mensajes/:id', (req, res)=>{
    //console.log(req.params)
    const {id} = req.params

    res.json({
        ok: true, 
        mensaje: 'Todo esta bien', 
        id
    })
})


//Ejemplo de petición GET con parametro de búsqueda, sirve para buscadores
// http://localhost:8080/api/mensajes?nombre=sonsoles&apellido=gf

app.get('/api/mensajes', (req, res)=>{
    //console.log(req)
    const {nombre, apellido} = req.query
    console.log(nombre)
    console.log(apellido)
    res.json({
        ok: true, 
        mensaje: 'Todo esta bien', 
        nombre, 
        apellido
    })
})


app.get('/api/usuarios', (req, res)=>{
    res.json({
        status: 200,
        usuarios: [
            {
                id: 1,
                nombre: 'Juan'
            },
            {
                id: 2, 
                nombre: 'Maria Sol'
            },
            {
                id: 3,
                nombre:'Pablo'
            }
        ]
    })
})

//POST sirve para crear datos. Es para enviar datos que no están en la URL. 

app.post('/api/mensajes', (req, res) =>{
    //console.log(req.body)
    const {nombre} = req.body
    res.json ({
        msg: 'todo ok',
        nombre
    })
})

// PUT sirve para actualizar
app.put('/api/mensajes/:id', (req, res) =>{
    //console.log(req.body)
    const {nombre} = req.body
    const {id} = req.params

    res.json ({
        msg: 'todo ok',
        id,
        nombre
    })
})

// DELETE: necesito el id 
app.delete('/api/mensajes/:id', (req, res) =>{
    const {id} = req.params

    res.json ({
        msg: 'borrados el mensaje',
        id
    })

})


//Configuramos el puerto 
const PORT = process.env.PORT || 8080 
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`)
}) // metodo que recibe dos parametros

