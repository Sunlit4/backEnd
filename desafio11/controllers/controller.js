//----------------INDEX---------------------//

const getIndex = (req, res) => res.render('form.hbs')

//----------------LOGIN--------------------//
const getLogin = (req, res) => {
    if(req.isAuthenticated()){
        let { username } = req.user; 
        res.render ('form.hbs', { username})
    }else res.render('login.hbs'); 
}; 

//-----------------SIGNUP----------------//
const getSignup = (req, res) => res.render('signup.hbs')

//-------------------PROCESS LOGIN----------//
const postLogin = (req, res) => {
	const { username } = req.user;
	res.render('form.hbs', { username });
}

//-------------------PROCESS SIGNUP----------//
const postSignup = (req, res) => {
	const { username } = req.user;
	res.render('form.hbs', { username });
}

const getFailLogin = (req, res) => res.render('faillogin.hbs');
const getFailSignup = (req, res) => res.render('failsignup.hbs');

//------------------------LOGOUT--------------//
const getLogout = (req, res) => {
	req.logout(error => { if (error) next(error) });
	res.redirect('/login');
}

const failRoute = (req, res) => res.status(404).render('routing-error');

module.exports = { getIndex, getLogin, getSignup, postLogin, postSignup, getFailLogin, getFailSignup, getLogout, failRoute};
