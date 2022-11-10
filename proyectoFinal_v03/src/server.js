import express from "express"; 
import session from "express-session";
import router from "./routes/index.js";
import {engine} from 'express-handlebars'
import mongoose from "mongoose"; 
import passport from "passport";
import "./middleware/passport.js"
import compression from "compression";
import cookie from "cookie-parser";
import cluster from "node:cluster";
import { cpus } from "node:os";
import process from "node:process";
import logger from "./logs/logger.js";



const enableExpress = () =>{
    const app = express();

    app.use(express.json())
    app.use(express.urlencoded({ extended:true }));
    app.use(express.static("public"));
    app.use(compression());
    app.use(cookie(process.env.COOKIES_SECRET));
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: true, 
            saveUninitialized: true, 
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(router)

    //View Engine
    app.set('views', './src/views');
    app.set('view engine', 'hbs');

    app.engine('hbs', engine({
        extname: '.hbs', 
        defaultLayout: 'index.hbs',
        layoutsDir:'src/views/layouts',
        partialsDir: 'src/views/partials'
    }))

    //Server
    const PORT = process.env.PORT || 8080; 
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser:true, 
            useUnifiedTopology: true,
        })
        .then(()=>{
            logger.info(`${new Date().toLocaleString()} - MongoDB is connected.`); 
            app.listen(PORT, ()=>{
                logger.info(
                    `${new Date().toLocaleString()} - 🚀 Server ${
                        process.pid
                    } running on port ${PORT}... `
                );
            });
        })
        .catch((error)=> logger.error(error.message));
};

const enableCluster = () =>{
    const numCPUs = cpus().length; 

    if (cluster.isPrimary){
        logger.info(
            `${new Date().toLocaleString()} - Master ${process.pid} is running.`
        );
        for (let i = 0; i < numCPUs; i++){
            cluster.fork();
        }
        cluster.on("exit", (worker)=>{
            logger.info(
                `${new Date().toLocaleString()} - ${worker.process.pid} is finished.`
            );
            cluster.fork();
        });
    }else{
        enableExpress();
    };
};

const CLUSTER = false; 
if(CLUSTER){
    enableCluster();
}else{
    enableExpress();
}