const express = require('express');
const multer = require('multer')
const adminRoutes = express.Router();




adminRoutes.route('/').get((req, res) => {
    if (req.session.user) {
        res.render('adminMain')
    } else {
        res.redirect('/auth/login')

    }
})

const multerConf = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({
    storage: multerConf
});

adminRoutes.use('/newadd', upload.array('submitIt'))
adminRoutes.route('/newadd').post((req, res) => {
    console.log(req.files)
    res.send(req.files)
})


module.exports = adminRoutes