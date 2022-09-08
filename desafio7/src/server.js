//---------------------MODULOS-------------------------------//
const express = require ('express')
const app = express()
const { engine } = require('express-handlebars');
const { Server} = require('socket.io');
const http = require('http')
const router = require('./routes/products')
const knex = require('./mariaDB/conexionDB')
const { optionsLite } = require('./SQlite3DB/connection');
const knexChat = require('knex')(optionsLite)

const server = http.createServer(app)

//-------------ENV-------------------------//
const dotenv = require('dotenv')
dotenv.config();

const Contenedor = require('./contenedor')
const Chat = require('./chat');



//---------------------------------------------//

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use ('/', router)
app.use(express.static('public'))


//---------------MOTORES DE PLANTILLA----------//

app.set('views', './views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

let chat = new Chat(knexChat, 'messages');
let products = new Contenedor(knex, 'products');

//.--------------------SOCKET--------------------------------//

const io = new Server(server);

io.on('connection', async (socket) =>{
    console.log('✔️ Usuario conectado')

    const arrayProduct = await products.getAll();
    const messages = await chat.getMessages();
    
    socket.emit('products', arrayProduct);
    socket.emit('messages', messages);

    socket.on("new-product", async(data)=>{
        await products.save(data);
        const arrayProduct = await products
          .getAll();
        io.sockets.emit("products", arrayProduct);
      });

    socket.on('new-messages', async(data)=>{
        await chat.saveMessages(data);
        const messages = await chat.getMessages();
        io.sockets.emit('messages', messages)
    })
    
})

//---------------------SERVER--------------------------------//
const PORT = 8080;
server.listen(PORT, () => {
    console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})
