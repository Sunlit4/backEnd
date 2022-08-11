const express = require('express');
const app = express();
const Contenedor = require('./contenedor');
const contenedor = new Contenedor("productos.json");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', '.' );
app.set('view engine', 'ejs'); 

app.get('/productos', async (req, res)=>{
    const productos = await contenedor.getAll();
    res.render('./views/pages/list', {productos})
})

app.get('/', (req,res) =>{
    res.render('./views/pages/forms', {})
})

app.post('/productos', async(req, res) =>{
    const {body} = req;
    await contenedor.save(body);
    res.redirect('/');
})

const PORT = 8080; 
const server = app.listen(PORT, ()=>{
    console.log(` >>>>> Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));