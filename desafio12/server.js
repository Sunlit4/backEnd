const express = require('express');
const { engine } = require('express-handlebars')
const cookieParser = require('cookie-parser'); 
const session = require('express-session');
const MongoStore = require('connect-mongo')
const productRouter = require('./routes/productos.js'); 
const userRouter = require ('./routes/user.js');
const otherRouter = require('./routes/randoms.js'); 
const minimist = require('minimist');
const passport = require('passport')

require('./middlewares/auth.js')
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use(cookieParser(process.env.COOKIES_SECRET))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 600000 },
}))

app.use(passport.initialize()); 
app.use(passport.session())

app.use(express.static('public'))

app.set('view engine', 'hbs'); 
app.set('views', './views');

app.engine('hbs', engine({
    extname: 'hbs', 
    defaultLayout:'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials' 
}))

app.use('/api/productos', productRouter);
app.use('/api/usuario', userRouter);
app.use('/test', otherRouter);



// --------------- Leer el puerto por consola o setear default -------------- //

const options = {
    alias: {
        "p": "PORT"
    },
    default: {
        "PORT": 8080
    }
};

const { PORT } = minimist(process.argv.slice(2), options);

const server = app.listen(PORT, () => {
    console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
    })
    
server.on('error', (err) => console.log(err));