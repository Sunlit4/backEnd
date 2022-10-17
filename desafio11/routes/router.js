const router = require('express').Router();
const passport = require('passport'); 
const { getIndex, getLogin, getSignup, postLogin, postSignup, getFailLogin, getFailSignup, getLogout, failRoute } = require('../controllers/controller.js')
const checkAuthentication = require('../middlewares/auth.js')

//----------------INDEX---------------------//
router.get('/', checkAuthentication, getIndex);

//----------------LOGIN--------------------//
router.get('/login', getLogin); 
router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), postLogin); 
router.get('/faillogin', getFailLogin)

//-----------------SIGNUP----------------//
router.get('/signup', getSignup)
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup'}), postSignup); 
router.get('/failsignup', getFailSignup); 

//-------------------REDIRECT TO LOGIN & SIGNUP---------//
router.post('/redirect-signup', (req, res)=> res.redirect('/signup')); 
router.post('/redirect-login', (req, res) => res.redirect('/login'))

//-------------------LOGOUT----------//
router.post('/logout', getLogout);

//------------------------FAIL ROUTE--------------//
router.get('*', failRoute); 

module.exports = router; 