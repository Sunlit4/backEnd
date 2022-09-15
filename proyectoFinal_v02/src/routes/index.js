import { Router} from "express";
import cartRoute from './carts.js';
import productRoute from "./products.js";

const router = Router();

router.use('/carrito', cartRoute);
router.use('/productos', productRoute);

export default router;
