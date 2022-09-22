const express = require ('express'); 
const ApiProductosMock = require('../api/productsApi.js'); 
const Contenedor = require('../managers/contenedor.js'); 
const apiController = require('../utils/generadorProductos.js')

const apiProducts = new ApiProductosMock();
const router = express.Router(); 

router.use(express.urlencoded({extended:true})); 
router.use(express.json()); 

let products = new Contenedor('productos.json'); 

router.get('/', async (req, res, next)=>{
    res.render('pages/forms', {})
})

router.get('/products', async (req, res) =>{
    try{
        const arrayProduct = await products.getAll()
        if (arrayProduct.length === 0){
            throw new Error("No hay products");
        }
        res.render('pages/datos', {arrayProduct});
    }catch (err){
        console.log(err)
    }
})

router.get("/products/:id", async (req, res, next) =>{
    try{
        const producto = await products.getById(Number(req.params.id))
        if (!producto){
            throw new Error('Producto no encontrado')
        }
        res.json(producto)
    }catch(err){
        next(err)
    }
})

router.post("/products", async (req, res) => {
    try {
        const nombresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s]+$/
        if (!req.body.title || !req.body.price || !req.body.thumbnail) {
            throw new Error("Debes enviar un producto con nombre, precio y URL");
        }
        if (req.body.price <= 0) {
            throw new Error('El precio debe ser mayor a 0');
        }
        if (!nombresValidos.exec(req.body.title)) {
        throw new Error('El nombre solo puede contener letras, números y espacios');
        }
        const {body} = req;
        await products.save(body)
        res.redirect('/');
    }catch(err){
        console.log(err);
    }
});

router.put('/products/:id', async (req, res, next)=>{
    try{
        const producto = await products
         .getById(Number(req.params.id))
         .then((res)=> res); 
        if(!producto){
            throw new Error("Producto no encontrado");
        }
        await products
         .update(
            Number(req.params.id),
            req.body.title,
            req.body.price, 
            req.body.thumbnail
         )
         .then((resolve)=>{
            res.json(resolve)
         }); 
    }catch(err){
        next(err)
    }
})

router.delete("/products/:id", async (req, res, next) => {
    try {
      const producto = await products.getById(Number(req.params.id))
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      await products.deleteById(Number(req.params.id)).then((resolve) => {
        res.json(`${producto.title} se borro con éxito`);
      });
    } catch (err) {
      next(err);
    }
});

function handleErrors(err, req, res, next) {
    console.log(err.message);
    res.render("pages/datos", {err});
}
router.use(handleErrors);

module.exports = router;
