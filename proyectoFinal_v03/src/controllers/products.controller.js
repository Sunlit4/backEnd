import { Product } from "../models/Product.js"; 
import logger from "../logs/logger.js";

export const getProducts = async (req, res) =>{
    const{ 
        params: { id },
    } = req; 
    if(id){
        try{
            const product = await Product.findById(id); 
            if(product){
                logger.info(
                    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                        req.method
                    } - Status: 200`
                ); 
                res.status(200).json(product);
            }else{
                logger.error(
                    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                        req.method
                    } - Status: 404`
                );
                res.status(404).json({ error: "Product not found." });
            }
        }catch(err){
            logger.warm(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                    req.method
                } - Status 500`
            );
            res.status(404).json({ error: err.message });
        }
    }else{
        try{
            const products = await Product.find();
            if(products){
                logger.info(
                    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                        req.method
                    } - Status: 200`
                );
                res.status(200).json(products);
            }else{
                logger.error(
                    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                        req.method
                    } - Status: 404`
                );
                res.status(404).json({ error: "Products not found." });
            }
        }catch (err){
            logger.warn(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                    req.method
                } - Status: 500`
            );
            res.status(500).json({error: err?.message})
        }
    }
};

export const createProduct = async (req, res) =>{
    const { body } = req;
    if(Object.entries(body).length == 0 || Object.entries(body).length < 6){
        logger.error(
            `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                req.method
            } - Status: 422`
        );
        res.status(422).json({
            error: "No se puede obtener los atributos del producto.",
        });
    }else{
        try{
            const newProduct = new Product(body);
            await newProduct.save();
            logger.info(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                    req.method
                } - Status: 201`
            ); 
            res.status(201).json({ newProduct: newProduct });
        }catch(err){
            logger.warn(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                    req.method
                } - Status: 500`
            );
            res.status(500).json({error: err?.message});
        }
    }
};

export const updateProduct = async (req, res) =>{
    const {
        params: {id},
    } = req; 
    const newProduct = req.body; 
    try{
        const product = await Product.findById(id); 
        if(product){
            await Product.findByIdAndUpdate(id, newProduct);
            logger.info(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                    req.method
                } - Status: 200`
            );
            res.status(200).json({ message: "Updated.", newProduct: newProduct });
        }else{
            logger.error(
                `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                    req.method
                } - Status: 404`
            );
            res.status(404).json({ error: "Product not found." });
        }
    }catch(err){
        logger.warn(
            `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                req.method
            } - Status: 500`
        );
        res.status(500).json({ error: err?.message });
    }
};

export const deleteProduct = async (req, res)=>{
    const{
        params: { id },
    } = req;
    try{
        const product = await Product.findById(id);
        if(product){
            await Product.findByIdAndDelete(id);
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
            res.status(404).json({ error: "Product not found." });
        }
    }catch(err){
        logger.warn(
            `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
                req.method
            } - Status: 500`
        );
        res.status(500).json({ error: err?.message });
    }
};