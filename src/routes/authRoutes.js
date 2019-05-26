// on 23rd of May we swiched any word of adminRoutes to authRoutes

const express = require('express');
const authControllers = require('../controllers/authControllers');
const authRoutes = express.Router();

authRoutes.route('/register').get((req, res) => {
    res.render('register', {
        userExist: false
    });
});

authRoutes.route('/register').post((req, res) => {
    // console.log(req.body)
    // res.send(req.body); // instead of hello we should see (req.body)
    authControllers.addUser(req.body.email, req.body.password, (check) => {
        if (check) {
            res.redirect('/admin')
        } else {
            res.render('register', {
                userExist: true
            })
        }
    })
});

authRoutes.route('/login').get((req, res) => {
    res.render('login', {
        LoginMessage: false
    });
});

authRoutes.route('/login').post((req, res) => {
    authControllers.checkUser(req.body.email, req.body.password, (user) => {
        if (user) {
            res.redirect('/admin')
        } else {
            res.render('login', {
                LoginMessage: true
            })
        }
    })
});

module.exports = authRoutes;