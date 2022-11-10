import Cart from "../models/Cart.js"; 
import { Product } from "../models/Product.js";
import logger from "../logs/logger.js";

export const getProductsByCartId = async (req, res) =>{
    const {
        params: {id},
    } = req; 
    try{
        const cart = await Cart.findById(id);
        if (cart){
            logger.info(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                  req.method
                } - Status: 200`
            );
            res.status(200).render('./pages/cart.hbs',{
                products: cart.products,
                cartId: cart._id,
            });
        }else{
            logger.error(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                    req.method
                } - Status: 404`
            );
            res.status(404).json({ error: "Cart not found." });
        }
    }catch (err) {
        logger.warn(
            `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                req.method
            } - Status: 500`
        );
        res.status(500).json({ error: err?.message });
    }
};

export const createCart = async (req, res) => {
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 1) {
        logger.error(
            `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                req.method
            } - Status: 422`
        );
        res.status(422).json({
            error: "No se pudo obtener los atributos del carrito correctamente.",
        });
    }else{
        try{
            const newCart = new Cart(body);
            await newCart.save();
            logger.info(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                req.method
            } - Status: 201`
        );
        res.status(201).json({ newCartId: newCart._id });
        }catch(err){
            logger.warn(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                    req.method
            } - Status: 500`
        );
        res.status(500).json({ error: err?.message });
        }
    }   
};

export const createProductOfACart = async (req, res) => {
    const{
        params: { id, id_prod },
    } = req;
    try{
        const product = await Product.findById(id_prod);
        const cart = await Cart.findById(id);
        if (product) {
            if (cart) {
                await Cart.findByIdAndUpdate(
                    { _id: id },
                    {
                        $push: { products: product },
                    }
                );
                logger.info(
                    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                        req.method
                    } - Status: 201`
                );
                res.status(302).redirect(`/api/cart/${id}/products`);
            }else{
                logger.error(
                    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                        req.method
                    } - Status: 404`
                );
                res.status(404).json({ error: "Cart not found." });
            }
        }else{
            logger.error(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                    req.method
                } - Status: 404`
            );
            res.status(404).json({ error: "Product not found." });
        }
    }catch (err){
        logger.warn(
            `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                req.method
            } - Status: 500`
        );
        res.status(500).json({ error: err?.message });
    }
};

export const deleteCart = async (req, res) => {
    const {
        params: { id },
    } = req;
    try{
        const cart = await Cart.findById(id);
        if(cart){
            await Cart.findByIdAndDelete(id);
            logger.info(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                    req.method
                } - Status: 200`
            );
            res.status(200).json({ message: "Deleted." });
        }else{
            logger.error(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                    req.method
                } - Status: 404`
            );
            res.status(404).json({ error: "Cart not found." });
        }
    }catch(err){
        logger.warn(
            `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                req.method
            } - Status: 500`
        );
        res.status(500).json({error: err?.message})
    }
};

export const deleteProductById = async (req,res)=>{
    const {
        params: { id, id_prod },
    } = req;
    try {
        const product = await Product.findById(id_prod);
        const cart = await Cart.findById(id);
        if (product) {
            if (cart) {
                await Cart.updateOne(
                    { _id: id },
                    { $pull: { products: { _id: id_prod } } }
                );
                logger.info(
                    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                        req.method
                    } - Status: 200`
                );
                res.status(302).redirect(`/api/cart/${id}/products`);
            }else {
                logger.error(
                    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                        req.method
                    } - Status: 404`
                );
                res.status(404).json({ error: "Cart not found." });
            }
        }else {
            logger.error(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                    req.method
                } - Status: 404`
            );
            res.status(404).json({ error: "Product not found." });
        }
    }catch (err){
        logger.warn(
            `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                req.method
            } - Status: 500`
        );
        res.status(500).json({ error: err?.message });
    }
};
