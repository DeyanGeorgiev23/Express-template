const User = require('mongoose').model('User');
const encryption = require('../utilities/encryption');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: (req, res) => {
        let userData = req.body;

        if (userData.username.length === 0) {
            res.locals.globalError = "Username is required!";
            return res.render('user/register');
        }

        if (userData.password.length < 6) {
            res.locals.globalError = "Password can't be less then 6 characters";
            return res.render('user/register');
        }

        let userAge = userData.age ? Number(userData.age) : 0;

        if (userAge < 18) {
            res.locals.globalError = "You have to be over 18 years old!";
            return res.render('user/register');
        }

        if (userData.password && userData.password !== userData.confirmedPassword) {
            res.locals.globalError = "Password don't match";
            return res.render('user/register');
        }

        let salt = encryption.generateSalt();
        userData.salt = salt;

        if (userData.password) {
            let hashedPass = encryption.generateHashedPass(salt, userData.password);
            userData.password = hashedPass;
        }

        User.create(userData).then(user => {
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = 'Authentication not working!';
                    return res.render('user/register');
                }

                res.redirect('/');
            });
        }).catch(err => {
            throw err;
        });
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: (req, res) => {
        let userData = req.body;

        User.findOne({ username: userData.username }).then(user => {
            if (!user) {
                res.locals.globalError = 'Invalid user data';
                return res.render('user/login');
            }

            if (!user.authenticate(userData.password)) {
                res.locals.globalError = 'Invalid user data';
                return res.render('user/login');
            }

            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('user/login');
                }

                res.redirect('/');
            });
        }).catch(err => {
            return console.log(err);
        });
    },
    logoutPost: (req, res) => {
        req.logout();
        res.redirect('/');
    }
};