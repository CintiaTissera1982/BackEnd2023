const express = require('express');
const routeController = require('./controllers/routesController.js')
const router = express.Router();


 routeController.createManager();



router.get('/products',routeController.getOnlyAFewProducts);
router.get('/products/:id',routeController.getProductsById);


module.exports= {router};

