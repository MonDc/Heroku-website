const express = require('express');
const adminRoutes = express.Router();

adminRoutes.route('/').get((req, res) => {
    if (req.session.user) {
        res.render('adminMain')
    } else {
        res.redirect('/auth/login')

    }
})


module.exports = adminRoutes