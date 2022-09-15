import { Router } from "express";
import { carritosDao as carritoApi } from "../daos/index.js";

const router = Router();

// GET /api/carrito/
router.get('/', async(req, res)=>{
    const carts = await carritoApi.getAll();
    res.status(200).json(carts)
})

// GET /api/carrito/:id/productos
router.get("/:id/productos", async (req, res) => {
    const { id } = req.params;
    const data = await carritoApi.getProductsByCartId(id);
    if (data === false) {
      res.status(404).send({ error: "No se encontraron carritos." });
    } else {
      if (data === null) {
        res
          .status(404)
          .send({ error: "No se encontraron productos en el carrito." });
      } else {
        res.status(200).json({ cartProducts: data });
      }
    }
  });

//POST /api/carrito
router.post("/", async (req, res) => {
    const newCart = req.body;
    if (
      Object.entries(newCart).length === 0 ||
      Object.entries(newCart).length < 3
    ) {
      const data = await carritoApi.createNewCart(newCart);
      res.status(201).json({ newCart: data });
    } else {
      res.status(422).json({
        error: "No se pudo obtener los atributos del carrito correctamente.",
      });
    }
});
export default router;