const express = require('express');

const endUserController = require('../controllers/enduserControllers')
const pagesRoutes = express.Router();

pagesRoutes.route('/').get((req, res) => {
    endUserController.getAdvs((ok,
        result
    ) => {
        if (ok) {
            res.render('index', {
                result
            });
            //res.send(result) !!!here i saved the file from db connection!!!
        } else {
            res.send(result)
        }

    })

});

pagesRoutes.route('/about').get((req, res) => {
    res.render('index');
});


module.exports = pagesRoutes;