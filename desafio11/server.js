const express = require ('express'); 
const { Server: HttpServer } = require('http'); 
const { Sever: IOServer } = require('socket.io');
const cookieParser = require ('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose'); 
const { engine } = require('express-handlebars');
const passport = require('passport'); 

const router = require('./routes/router.js')
require('./middlewares/auth.js')


const PORT = process.env.port || 8080; 
const app = express(); 

const httpserver = new HttpServer(app)



app.use(express.urlencoded({extended:true}));
app.use(express.json()); 

app.use(cookieParser()); 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 100000
    }
}));

app.use(passport.initialize()); 
app.use(passport.session());


app.use(router);
app.use(express.static('views'));
app.engine('hbs', engine());
app.set('views', './views');
app.set('view engine', 'hbs');

const server = httpserver.listen(PORT, async()=>{
    await mongoose.connect('mongodb+srv://sonsolesgf:gfson04@cluster1.annhvfn.mongodb.net/?retryWrites=true&w=majority')
    console.log(`Server running on port ${PORT}`)
})
server.on('error', err => console.log(`Error: ${err}`));