//----------------INDEX---------------------//

const getIndex = (req, res) => res.render('login.hbs')

//----------------LOGIN--------------------//
const getLogin = (req, res) => {
    if(req.isAuthenticated()){
        let { username } = req.user; 
        res.render ('pages/home.hbs', { username })
    }else res.render('pages/login.hbs'); 
}; 

//-----------------SIGNUP----------------//
const getSignup = (req, res) => res.render('pages/signup.hbs')

//-------------------PROCESS LOGIN----------//
const postLogin = (req, res) => {
	const { username } = req.user;
	res.render('pages/home.hbs', { username });
}

//-------------------PROCESS SIGNUP----------//
const postSignup = (req, res) => {
	const { username } = req.user;
	res.render('pages/home.hbs', { username });
}

const getFailLogin = (req, res) => res.render('pages/signup.hbs');
const getFailSignup = (req, res) => res.render('pages/signup.hbs');

//------------------------LOGOUT--------------//
const getLogout = (req, res) => {
	req.logout(error => { if (error) next(error) });
	res.redirect('api/usuario/login');
}

const failRoute = (req, res) => res.status(404).render('pages/home.hbs');

module.exports = { getIndex, getLogin, getSignup, postLogin, postSignup, getFailLogin, getFailSignup, getLogout, failRoute};

