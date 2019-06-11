const express = require('express');
const multer = require('multer')
const adminRoutes = express.Router();

const authControllers = require('../controllers/authControllers')



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

adminRoutes.use('/newadv', upload.array('submitIt'))
adminRoutes.route('/newadv').post((req, res) => {
    console.log(req.files[0])
    authControllers.newAdv(

        req.body.title,
        req.body.keyword,
        req.body.description,
        req.body.category,
        req.files[0].destination.replace("./public", "") + req.files[0].filename, (result) => {
            res.send(result)

        })

    //console.log(req.body)

})



adminRoutes.route('/changepassword').get((req, res) => {
    if (req.session.user) {
        //res.send(req.session.user)
        res.render('changepassword')

    } else {
        res.redirect('/')

    }
});
adminRoutes.route('/changepassword').post((req, res) => {
    //res.send(req.body.changepassword)
    console.log(req.session.user);
    authControllers.changePassword(req.session.user._id, req.body.changepasswordInput, (result) => {
        req.session.destroy();
        res.redirect('/auth/login')
        //res.send(result)
    })
})


module.exports = adminRoutes