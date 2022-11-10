import { Router } from "express";
import {isAuth} from "../middleware/index.js";
import { Product } from "../models/Product.js";
import User from "../models/User.js"; 
import cartRouter from "./cartRoutes.js";
import productRouter from "./productsRoutes.js"; 
import registerRouter from "./registerRoutes.js";
import loginRouter from "./loginRoutes.js";
import logoutRouter from "./logoutRoutes.js";
import userRouter from "./userRoutes.js";
import logger from "../logs/logger.js";

const router = Router(); 

router.get('/', isAuth, async(req, res)=>{
    const products = await Product.find();
    const { cart_id } = await User.findById(req.user._id);
    logger.info(
        `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
            req.method
        } - Status: 200`
    ); 
    res.status(200).render("index.hbs", { products: products, cartId: cart_id });
});

router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/register", registerRouter);
router.use("/user", userRouter);
router.use("/api/cart", cartRouter);
router.use("/api/products", productRouter);

router.use((req, res)=>{
    logger.error(
        `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
            req.method
        } - Status 404`
    );
    res.status(404).render("./pages/404.hbs");
}); 

export default router; 