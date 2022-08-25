const express = require('express');
const Contenedor = require ('./contenedor')
const contenedor = new Contenedor('productos.txt')
const { Router } = express
const app = express()


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

///////////////////////////////////////////////////////////////////////////
const routerProductos = Router ()

//GET
routerProductos.get('/', async (req, res) =>{
    const productos = await contenedor.getAll();
    res.status(200).json(productos)
})

//GET /api/productos/:id
routerProductos.get('/:id', async (req, res) =>{
    const {id} = req.params;
    const producto = await contenedor.getById(id)
    producto
        ? res.status(200).json(producto)
        : res.status(404).json({error: "Producto no encontrado"})
})

//POST /api/productos 
routerProductos.post('/', async (req, res) =>{
    const {body} = req
    const newProductoId = await contenedor.save(body)
    res.status(200).json(`Producto agregado con el ID: ${newProductoId}`)
})

//PUT /api/productos/:id
routerProductos.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const wasUpdated = await contenedor.updateById(id,body);
    wasUpdated
        ? res.status(200).send(`El producto de ID: ${id} fue actualizado`)
        : res.status(404).send(`El producto no fue actualizado porque no se encontró el ID: ${id}`);
} )

//DELETE '/api/productos/:id'
routerProductos.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await contenedor.deleteById(id);
    wasDeleted 
        ? res.status(200).send(`El producto de ID: ${id} fue borrado`)
        : res.status(404).send(`El producto no fue borrado porque no se encontró el ID: ${id}`)
})

//////////////////////////////////////////////////////////////////////////
app.use('/api/productos', routerProductos)

app.listen(4000, err => {
    if (err) throw err
    console.log('Server runing on port 4000')
})