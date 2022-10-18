const express = require('express'); 
const router = express.Router(); 
const passport = require('passport'); 
const { getIndex, getLogin, getSignup, postLogin, postSignup, getFailLogin, getFailSignup, getLogout, failRoute } = require('../controllers/user.controller.js')
const checkAuthentication = require('../middlewares/auth.js')

//----------------INDEX---------------------//
router.get('/', async(req, res)=>{
    if(req.checkAuthentication){
        getIndex
    }else{
        res.render('pages/login', {status:false})
    }
})

//----------------LOGIN--------------------//
router.get('/api/usuario/login', getLogin); 
router.post('/login', passport.authenticate('login', {failureRedirect: 'api/usuario/signup'}), postLogin); 
router.get('api/usuario/signup', getFailLogin)

//-----------------SIGNUP----------------//
router.get('api/usuario/signup', getSignup)
router.post('api/usuario/signup', passport.authenticate('signup', { failureRedirect: '/failsignup'}), postSignup); 
router.get('/failsignup', getFailSignup); 

//-------------------REDIRECT TO LOGIN & SIGNUP---------//
router.post('/redirect-signup', (req, res)=> res.redirect('/api/usuarios/signup')); 
router.post('/redirect-login', (req, res) => res.redirect('api/usuario/login'))

//-------------------LOGOUT----------//
router.post('api/usuario/logout', getLogout);

//------------------------FAIL ROUTE--------------//
router.get('*', failRoute); 

module.exports = router; 