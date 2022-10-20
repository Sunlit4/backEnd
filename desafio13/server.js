const express = require('express'); 
const { PORT } = require('./config.JS');
require('./mongodb/mongooseLoader.js');
const { Router } = express;
const router = Router();
const session = require('express-session');
const bCrypt = require('bcrypt');
const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo');
const { engine } = require('express-handlebars');
const { Socket } = require('socket.io')
const {fork} = require('child_process'); 
const User = require('./models/user.js')
const { normalizar, print, denormalizar } = require('./utils/normalizar.js');
const ApiProductosMock = require('./api/productos.js');
const apiProductos = new ApiProductosMock();
const Chat = require('./contenedores/chat.js');

const app = express(); 
const server = require('http').Server(app); 
const io = require('socket.io')(server);
const {MONGOURL} = require('./config.js')
 

const cluster = require('cluster'); 
const { prototype } = require('events');
const numCPUs = require('os').cpus().length

/*-----------------------------------------------------------------------*/
if (cluster.isMaster && prototype.m == 'CLUSTER'){
    console.log(numCPUs)
    console.log(`PID MASTER ${process.pid}`)
    for (let i = 0; i < numCPUs; i++ ){
        cluster.fork()
    }
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork
    })
}
else{
    app.use('/api', router);
    app.use(express.json()); 
    app.use(express.urlencoded({extended:true}));
    app.use(
        session({
            store: MongoStore.create({
                mongoUrl: process.env.MONGOURL,
                mongoOptions:{
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            }),
            secret: process.env.SESSION_SECRET, 
            resave: true, 
            saveUninitialized: true, 
        })
    );

    app.use(express.static('./public')); 
    app.engine(
        'hbs',
        engine({
            defaultLayout: 'index', 
            extname: 'hbs'
        })
    );
    app.set('view engine', 'hbs');
    app.set('views', './views');

    const flash = require('connect-flash'); 
    router.use(flash()); 
    
    function isValidPassword(user, password) {
        console.log (user, password)
        return bCrypt.compareSync(password, user.password);
    }
    function createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

    passport.use(
        'login',
        new LocalStrategy( {passReqToCallback : true}, (req, username, password, done) => {
          User.findOne({ username }, (err, user) => {
            if (err) return done(err);
            if (!user) {
              console.log('User Not Found with email ' + username);
              return done(null, false, req.flash('message', 'Usuario no encontrado.'));
            }
            if (!isValidPassword(user, password)) {
              console.log('Invalid Password');
              return done(null, false, req.flash('message', 'Contraseña incorrecta'));
            }
            return done(null, user);
            });
        })
    );

    passport.use('signup', new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {
        User.findOne({ 'username' : username }, (err, user) => {
            if (err){
                console.log('Error in SignUp: '+err);
                return done(err);
            }
            if (user) {
                console.log('User already exists with username: ' + username);
                return done(null, false, req.flash('message','El usuario ya se encuentra registrado'));
            } else {
                const newUser = new User();
                newUser.username = username;
                newUser.password = createHash(password);
                newUser.save((err) => {
                    if (err){
                    console.log('Error in Saving user: '+err);  
                    throw err;  
                    }
                console.log('User Registration succesful');    
                return done(null, newUser);
                });
            }
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
    });

    router.use(passport.initialize());
    router.use(passport.session)

    let chat = new Chat('./contenedores/chat.txt')

    io.on('connection', async (socket) => {
        console.log('Un cliente se ha conectado');
      
        const arrayDeProductos = await apiProductos.getAll();
        const messages = await chat.getMessages().then((res) => res);
        const normalizedMessages = normalizar(messages);
        const denormalizedMessages = denormalizar(normalizedMessages);
      
        socket.emit('productos', arrayDeProductos);
        socket.emit('messages', normalizedMessages);
      
        socket.on('new-product', async (data) => {
          await productos.save(data).then((resolve) => resolve);
          const arrayDeProductos = await apiProductos.getAll();
      
          io.sockets.emit('productos', arrayDeProductos);
        });
      
        socket.on('new-message', async (data) => {
          await chat.saveMessages(data).then((resolve) => resolve);
          const messages = await chat.getMessages().then((resolve) => resolve);
          const normalizedMessages = normalizar(messages);
          io.sockets.emit('messages', normalizedMessages);
        });
    });

    router.get('/info', (req, res)=>{
        let info = {
            args: process.argv,
            platform: process.platform,
            version: process.version,
            memory: JSON.stringify(process.memoryUsage()),
            path: process.execPath,
            pid: process.pid,
            cwd: process.cwd(),
            CPUS: numCPUs
        }
        res.json(info)
    })

    router.get('/random/:cant?',(req, res) =>{
        const forked = fork('./utils/generateRandom.js');
        let cant = +req.params.cant || 100000000;
        forked.send(cant);
        forked.on('message', (numeros) => {
            res.send(numeros.res);
        })
    })

    router.get('/', async (req, res, next) => {
        if (req.isAuthenticated()) {
          res.render('form-new-product', { user: req.user.username });
        }
        else {
          res.render('form-new-product');
        }
      });
      
    router.get('/productos-test', async (req, res, next) => {
        try {
          const arrayDeProductos = await apiProductos.getAll();
          if (arrayDeProductos.length === 0) {
            throw new Error('No hay productos');
          }
          res.render('datos', { arrayDeProductos });
        } catch (err) {
          next(err);
        }
    });
      
    router.get('/productos/:id', async (req, res, next) => {
        try {
          const producto = await productos
            .getById(Number(req.params.id))
            .then((resolve) => resolve);
          if (!producto) {
            throw new Error('Producto no encontrado');
          }
          res.json(producto);
        } catch (err) {
          next(err);
        }
    });
      
    router.get('/logout', async (req, res, next) => {
        if (req.session.user) {
          const session = req.session.user;
          req.session.destroy((err) => {
            if (err) {
              console.log(err);
            } else {
              res.json(`Hasta luego ${session}`);
            }
          });
          setTimeout(() => {
            res.redirect('/api');
          }, 2000);
        }
    });
      
    router.get('/signin', (req, res) => {
        res.render('signin');
    })
    router.get('/signup', (req, res) => {
        res.render('signup');
    })
    router.get('/logoff', (req, res) => {
        req.logOut();
        res.redirect('/api');
    })
    router.get('/errorlogin', (req, res) => {
        res.render('errorlogin', {message: req.flash('message')})
    })
    router.get('/errorsignup', (req, res) => {
        res.render('errorsignup', {message: req.flash('message')})
    })
      
    router.post('/login', async (req, res, next) => {
        try {
            if (!req.body.userName) {
                throw new Error('Debe enviar un nombre de usuario');
            }
        req.session.user = req.body.userName;
        req.session.save((err) => {
            if (err) {
              console.log(err);
            } else {
              res.json(`Login correcto ${req.session.user}`);
            }
            });
        }catch (error) {
          next(error);
        }
    });
      
    router.post('/signin', passport.authenticate('login', { failureRedirect: '/api/errorlogin'}), (req, res) => {
        req.session.username = req.body.username;
        res.redirect('/api')
    });
    router.post('/signup', passport.authenticate('signup', { successRedirect: '/api', failureRedirect: '/api/errorsignup'}));
      
    router.post('/productos', async (req, res, next) => {
        try {
          res.json(await apiProductos.popular(req.query.cant));
        } catch (err) {
          next(err);
        }
    });
      
    router.put('/productos/:id', async (req, res, next) => {
        try {
          const producto = await productos
            .getById(Number(req.params.id))
            .then((res) => res);
          if (!producto) {
            throw new Error('Producto no encontrado');
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
          next(err);
        }
    });
    router.delete('/productos/:id', async (req, res, next) => {
        try {
          const producto = await productos
            .getById(Number(req.params.id))
            .then((resolve) => resolve);
          if (!producto) {
            throw new Error('Producto no encontrado');
          }
          await productos.deleteById(Number(req.params.id)).then((resolve) => {
            res.json(`${producto.title} se borro con éxito`);
          });
        } catch (err) {
          next(err);
        }
    });

    function handleErrors(err, req, res, next) {
        console.log(err.message);
        res.render('datos', { err });
    }
    router.use(handleErrors);

    const srv = server.listen(PORT.p, () =>{
        console.log(
            `(Pid: ${process.pid}) Servidor Express escuchando peticiones en el puerto ${srv.address().port}`
        )
    })
    srv.on("error", (error) => console.log(`Error en servidor ${error}`));

}





