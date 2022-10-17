const express = require('express'); 
const { engine } = require('express-handlebars')
const session = require('express-session')
const http = require('http')

const usuarios = []; 

const app = express(); 
const server = http.createServer(app);

app.use(
    session({
        secret: 'shhhhhhhhhhhhhh', 
        resave: false, 
        saveUninitialized: false, 
        cookie: {
            maxAge: 60000
        },
    })
)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))


app.set('views', './views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
})
)

//----------------------------------------------------//
//Verificar Autenticación
//---------------------------------------------------//

app.use((req, res, next)=>{
    req.isAuthenticated = () =>{
        if (req.session.nombre){
            return true
        }
        return false
    }
    req.logout = done =>{
        req.session.destroy(done)
    }
    next
})

//-------------------------------------------------//
// RUTAS REGISTRO
//------------------------------------------------//

app.get('/register', (req, res)=>{
    res.render('register')
})

app.post('/register', (req, res)=>{
    const {nombre, password, direccion} = req.body

    const usuario = usuarios.find(usuario => usuario.nombre == nombre)
    if (usuarios){
        return res.render('register-error')
    }
    usuarios.push ({nombre, password, direccion})
    res.redirect('/login')
})

//----------------------------------------------------//
// RUTAS LOGIN
//---------------------------------------------------//

app.get('/login', (req, res)=>{
    if (req.isAuthenticated()){
        res.redirect('/datos')
    }
    res.render('login')
})

app.post('/login', (req, res)=>{
    const { nombre, password} = req.body

    const usuario = usuarios.fins(
        usuarios => usuario.nombre == nombre && usuario.password == password
    )
    if (!usuario){
        return res.render('login-error')
    }

    req.session.nombre = nombre
    req.session.contador = 0
    res.redirect('/datos')

})

//---------------------------------------------------//
// RUTAS DATOS
//---------------------------------------------------//

function requireAuthentication(req, res, next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
}

function includeUserData(req, res, next){
    if(req.session.nomre){
        req.user = usuarios.find(usuario => usuario.nombre == req.session.nombre)
    }
    next()
}

app.get('/datos', requireAuthentication, includeUserData, (req, res)=>{
    req.session.contador++
    res.render('datos', {
        datos: req.usuer, 
        contador: req.session.contador,
    })
})

//---------------------------------------------------//
// RUTAS LOGOUT
//---------------------------------------------------//

app.get('/logout', (req, res)=>{
    req.logout(err =>{
        res.redirect('/login')
    })
})

//---------------------------------------------------//
// RUTA INICIO
//---------------------------------------------------//
app.get('/', (req, res)=>{
    res.redirect('/datos')
})

const PORT = 8080;
server.listen(PORT, () => {
    console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})