import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/routesIndex.js'
import session from 'express-session';
import mongoStore from 'connect-mongo';
import './config/passport.js'



const app = express(); 

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true})); 
app.use(cors());
app.use(express.static('public'));
app.use(compression())

app.use(cookieParser());
app.use(router); 

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        rolling: true,
        cookie: { maxAge: 600000 },
        store: mongoStore.create({mongoUrl: process.env.MONGODB_URI, mongoOptions:{useNewUrlParser:true, useUnifiedTopology: true}})
    })
)



//View Engine
app.set('view engine', 'ejs');
app.set('views', './public/views')

export default app