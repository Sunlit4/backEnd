const express = require ('express');
const Contenedor = require('../contenedor');
const knex = require('../mariaDB/conexionDB');

const router = express.Router();

router.use(express.urlencoded({extended: true}));
router.use(express.json());

let products = new Contenedor(knex, 'products');

//--------------RUTAS-----------------------------//

router.get('/', async(req, res)=>{
    res.render('pages/forms', {});
});

router.get('/productos', async (req, res)=>{
    try {
        const arrayProduct = await products
          .getAll()
          .then((resolve) => resolve);
        if (arrayProduct.length === 0) {
          throw new Error("No hay products");
        }
        res.render('pages/datos', {arrayProduct});
    }catch (error) {
        console.log (error)
    }
})

router.get('/productos/:id', async (req, res)=>{
    try {
        const producto = await products
        .getById(Number(req.params.id))
        .then((resolve) => resolve);
        if (!producto) {
          throw new Error("Producto no encontrado");
        }
        res.json(producto);
    }catch (err) {
        console.log(err)
    }
})

router.post('/productos', async (req, res)=>{
    try{
        if(!req.body.title || !req.body.price){
            throw new Error("Debes enviar un producto con nombre y precio");
        }
        if (req.body.price <= 0) {
            throw new Error('El precio debe ser mayor a 0');
        }
        await products.save(req.body).then((resolve)=>{
            res.redirect('/');
        })
    }catch(error){
        console.log(error);
    }
});

router.put("/productos/:id", async (req, res) => {
    try{
        const producto = await products
        .getById(Number(req.params.id))
        .then((res) => res);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        await products
        .update(
            Number(req.params.id),
            req.body.title,
            req.body.price,
        )
        .then((resolve) => {
          res.json(resolve);
        });
    }catch (error) {
      console.log(error);
    }
});

router.delete("/products/:id", async (req, res) => {
    try {

        const producto = await products
        .getById(Number(req.params.id))
        .then((resolve) => resolve);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        await products.deleteById(Number(req.params.id)).then((resolve) => {
            res.json(`${producto.title} se borro con éxito`);
        });
    }catch (error) {
      console.log(error);
    }
});

module.exports = router;