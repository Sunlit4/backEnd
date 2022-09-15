import { Router } from "express";
import { productosDao as productoApi } from "../daos/index.js";

const router = Router();

// GET /api/productos/
router.get('/', async(req, res)=>{
    const products = await productoApi.getAll();
    res.status(200).json(products)
})

// GET /api/productos/:id?
router.get('/:id?', async (req,res)=>{
    const {id} = req.params; 
    if (id){
        const data = await productoApi.getById(id);
        if (data === false){
            res.status(404).send({error: 'No se encontro el producto'})
        }else{
            res.status(200).json({data:data})
        }
    }else{
        const data = await productoApi.getAll();
        if (data === false){
            res.status(404).send({error: "No se encontraron productos." })
        }else{
            res.status(200).json({data:data})
        }
    }
})

//POST /api/productos/

router.post('/', async(req, res)=>{
    const {body} = req;
    body.timestamp = Date.now();

    const newProduct = await productoApi.createNewProduct(body);
    newProduct
        ? res.status(200).json({'success' : 'product added'})
        : res.status(400).json({'error': 'invalid key. Please verify the body content'})
})

//PUT /api/productos/:id
router.put('/:id', async (req, res)=>{
    const {id} = req.params; 
    let newProduct = req.body;
    const data = await productoApi.getAll();
    if (data.length === 0){
        res.status(404).send({ error: "No se encontraron productos." });
    }else{
        const lastItem = data[data.length - 1];
        if(lastItem.id >= id){
            const product = await productoApi.editProduct(data, id, newProduct);
            res.status(200).json({ updatedProduct: product });
        }else{
            res.status(404).send({ error: "No se encontró el producto." });
        }
    }
});

//DELETE /api/productos/:id
router.delete('/:id', async(req, res)=>{
    const { id } = req.params;
    if((await productoApi.deleteById(id)) === false){
        res.status(404).send({ error: "No se encontró el producto." });
    }else{
        res.status(200).send({ success: "Se eliminó el producto correctamente." });
  }
})

export default router;