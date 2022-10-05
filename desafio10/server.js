const { normalizar, print, denormalizar } = require('./utils/normalizar.js');
const ApiProductosMock = require('./api/productos.js')
const apiProductos = new ApiProductosMock(); 
const Chat = require ('./contenedores/chat.js')
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}
const { engine } = require('express-handlebars');
const { Socket } = require('socket.io');



const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); 

const { Router } = express; 
const apiRouter = Router(); 

app.engine('hbs', engine({
    defaultLayout: "index", 
    extname: ".hbs",
    })
);

app.set ('view engine', 'hbs');
app.set('views', './views'); 

app.use(express.static('./public')); 
app.use('/', apiRouter); 
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({extended:true})); 

apiRouter.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://sonsolesgf:gfson04@cluster1.annhvfn.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),

    secret: 'shhhhhhhhhhhhhhhhhhhh', 
    resave: false, 
    saveUninitialized: false
}))

let chat = new Chat('./contenedores/chat.json')

io.on("connection", async (socket) => {
    console.log("Un cliente se ha conectado");
  
    const arrayDeProductos = await apiProductos.getAll()
    const messages = await chat.getMessages().then((res) => res);
    const normalizedMessages = normalizar(messages);
    const denormalizedMessages = denormalizar(normalizedMessages);
    
    socket.emit("productos", arrayDeProductos);
    socket.emit("messages", normalizedMessages);
  
    socket.on("new-product", async (data) => {
      await products.save(data);
      const arrayDeProductos = await apiProductos.getAll()
  
      io.sockets.emit("productos", arrayDeProductos);
    });
  
    socket.on("new-message", async (data) => {
      await chat.saveMessages(data).then((resolve) => resolve);
      const messages = await chat.getMessages().then((resolve) => resolve);
      const normalizedMessages = normalizar(messages);
      io.sockets.emit("messages", normalizedMessages);
    });
});

apiRouter.get('/', async (req, res) => {
    res.render("forms", {user: req.session.user});
});
  
apiRouter.get("/product-test", async (req, res) => {
    try {
      const arrayDeProductos = await apiProductos.crearProductos()
      if (arrayDeProductos.length === 0) {
        throw new Error("No hay productos");
      }
      res.render("datos", { arrayDeProductos });
    } catch (err) {
        console.log(err);
    }
});
  
apiRouter.get("/products/:id", async (req, res) => {
    try {
      const producto = await productos
        .getById(Number(req.params.id))
        .then((resolve) => resolve);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      res.json(producto);
    } catch (err) {
        console.log(err);
    }
});
  
apiRouter.get("/logout", async (req, res) => {
    if(req.session.user) {
      const session = req.session.user;
      req.session.destroy(err => {
        if(err){
          console.log(err);
        } else {
          res.json(`Hasta luego ${session}`)
        }
      })
      setTimeout(() => {
        res.redirect('/api');
      }, 2000)
    }
})
  
apiRouter.post("/login", async (req, res) => {
    try {
      if (!req.body.userName) {
        throw new Error('Debe enviar un nombre de usuario');
      }
      req.session.user = req.body.userName;
      req.session.save(err => {
        if(err){
          console.log(err);
        } else {
          res.json(`Login correcto ${req.session.user}`)
        }
      })
    } catch (error) {
      console.log(error);
    }
})
  
apiRouter.post("/products", async (req, res) => {
    try {
    res.json(await apiProductos.popular(req.query.cant))
    } catch (err) {
        console.log(err)
    }
});
  
apiRouter.put("/products/:id", async (req, res) => {
    try {
      const producto = await productos
        .getById(Number(req.params.id))
        .then((res) => res);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      await productos
        .update(
          Number(req.params.id),
          req.body.title,
          req.body.price,
          req.body.thumbnail
        )
        .then((resolve) => {
          res.json(resolve);
        });
    } catch (err) {
        console.log(err)
    }
});

apiRouter.delete("/products/:id", async (req, res) => {
    try {
      const producto = await productos
        .getById(Number(req.params.id))
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      await productos.deleteById(Number(req.params.id)).then((resolve) => {
        res.json(`${producto.title} se borro con éxito`);
      });
    } catch (err) {
        console.log(err);
    }
});

const PORT = process.env.PORT || 8080; 
const srv = server.listen(PORT, ()=>{
    console.log(
        `>>>>> 🚀 Server started at http://localhost:${PORT}`
    )
})
srv.on('error', (error)=>console.log(`Error en servidor ${error}`))
