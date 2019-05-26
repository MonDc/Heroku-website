const express = require('express');

const adminRoutes = express.Router();

adminRoutes.route('/').get((req, res) => {
    res.render('adminMain')
})


module.exports = adminRoutes