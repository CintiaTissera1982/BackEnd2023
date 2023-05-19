const express = require('express');
const routeController = require('./controllers/routesController.js')
const router = express.Router();

//router.get('/products',routeController.getProducts);
router.get('/products/:pid?',routeController.getProducts);

module.exports= {router};