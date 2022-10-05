const express = require ('express'); 
const app = express ()
const ApiProductosMock = require('./api/productsApi.js');
const apiProducts = require ('./routes/productos.js'); 
const Contenedor = require('./managers/contenedor.js')
const Chat = require('./managers/chat.js')
const {engine} = require ('express-handlebars');
const { Server } = require ('socket.io');
const http = require('http')
const { normalizar, print, denormalizar } = require('./utils/normalizar.js')


const server = http.createServer(app)

const productMock = new ApiProductosMock;
let chat = new Chat ('chat.json')
let products = new Contenedor('productos.json'); 
let listProducts = []

//----------MIDDLEWARES--------------------------------//

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/', apiProducts)
app.use(express.static('public'))
app.use((req, res, next) =>{
    console.log (`Product Middleware, Time: ${Date.now()}`)
    next()
})

app.use(function(err, req, res, next){
    console.error(err)
    res.status(500).send("Something it's wrong")
})

//----------------------MOTOR DE PLANTILLA-------------------//
app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

try{
    const data = async() => await products.getAll()
    data().then(list =>{
        listProducts = list
    })
}catch(error){
    console.error(error)
}

//-----------------SERVER-----------------------//
const PORT = process.env.PORT || 8080; 
server.listen(PORT, ()=> console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`))

//--------------------SOCKET---------------------//

const io = new Server(server);

io.on('connection', async (socket) => {
    console.log('User connected')

    const arrayProduct = await products.getAll();
    const messages = await chat.getMessages();

    const normalizedMessages = normalizar(messages);
    print(normalizedMessages);
    const denormalizedMessages = denormalizar(normalizedMessages);
    print(denormalizedMessages);

    socket.emit("products", arrayProduct);
    socket.emit("messages", normalizedMessages);

    socket.on("new-product", async (data) => {
        await products.save(data).then((resolve) => resolve);
        const arrayProduct = await products
          .getAll()
          .then((resolve) => resolve);
        io.sockets.emit("products", arrayProduct);
      });
    
    socket.on("new-message", async (data) => {
        await chat.saveMessages(data).then((resolve) => resolve);
        const messages = await chat.getMessages().then((resolve) => resolve);
        const normalizedMessages = normalizar(messages);
        io.sockets.emit("messages", normalizedMessages);
      });
});