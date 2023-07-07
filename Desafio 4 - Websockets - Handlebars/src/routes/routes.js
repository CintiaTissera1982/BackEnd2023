import express from 'express'
import {getProducts,addProduct,deleteByIdProduct, updateById, renderHome,realTimeProducts} from './controllers/productController.js';
import { addCart,getCart,putProductToCart } from './controllers/cartController.js';

const router = express.Router();


router.get('/api/products/:id?',getProducts);
router.post('/api/products/',addProduct)
router.put('/api/products/:id',updateById)
router.delete('/api/products/:id',deleteByIdProduct)

router.get('/api/cart/:cid',getCart);
router.post('/api/cart/',addCart);
router.post('/api/cart/:cid/products/:pid',putProductToCart);

router.get('/realtimeproducts',realTimeProducts)
router.get('/home',renderHome)

export {router}