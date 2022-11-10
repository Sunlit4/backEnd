import { Router } from "express";
import logger from "../logs/logger.js"

const router = Router();

router.get('/', (req, res)=>{
    req.logOut((err)=>{
        if(err){
            console.log(err);
        }
        logger.info(
            `${new Date().toLocaleString()} - URL: ${req.url} - Method: ${
                req.method
            } - Status: ${req.statusCode}`
        );
        res.status(302).redirect("/");
    });
});

export default router; 