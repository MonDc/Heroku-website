const express = require('express');
const multer = require('multer')
const adminRoutes = express.Router();

const authControllers = require('../controllers/authControllers');
const enduserControlders = require('../controllers/enduserControllers')

//use session as middlewear
// app.use shoud be the first before adminroutes.route
adminRoutes.use((req, res, next) => {
    if (req.session.user) {
        next();

    } else {
        res.redirect('/auth/login')

    }
})



adminRoutes.route('/').get((req, res) => {
    res.render('adminMain')

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

adminRoutes.use('/newadv', upload.array('submitIt', 10))
adminRoutes.route('/newAdv').get((req, res) => {
    authControllers.getCategories((ok, result) => {
        if (ok) {
            console.log(result)
            res.render('newAdv', {
                result
            });
        } else {
            res.send(result)
        }

    })


})

adminRoutes.route('/advsManag').get((req, res) => {
    enduserControlders.getAdvs((ok, result) => {
        if (ok) {
            console.log(result)
            res.render('advsManag', {
                result
            })
        } else {
            res.send(result)
        }
    })
})

adminRoutes.route('/advsedite/:id').get((req, res) => {
    const advId = req.params.id;
    authControllers.getIndividualAd(advId, (checkAdv, adv) => {
        if (checkAdv) {
            authControllers.getCategories((ok, categorieeeees) => {
                if (ok) {
                    res.render('advsedite', {
                        categorieeeees,
                        adv
                        // this result is the category
                    });
                } else {
                    res.send(categorieeeees)
                }

            })

        } else {
            res.send(adv);
        }
    })
})



adminRoutes.route('/newadv').post((req, res) => {
    console.log(req.files[0])
    let phtosArrFromDb = [];
    for (let i = 0; i < req.files.length; i++) {
        phtosArrFromDb.push(req.files[i].destination.replace("./public", "") + req.files[i].filename);
        //the line above (for only one photo) was like this
        //req.files[0].destination.replace("./public", "") + req.files[0].filename

    }
    authControllers.newAdv(

        req.body.title,
        req.body.keyword,
        req.body.description,
        req.body.category,
        req.body.newcategory,
        phtosArrFromDb, (result) => {
            //res.send(result)  this is to delete the ugly message ( n-1)
            authControllers.getCategories((ok, result) => {
                if (ok) {
                    console.log(result)
                    res.render('newAdv', {
                        result
                    });
                } else {
                    res.send(result)
                }
            })

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