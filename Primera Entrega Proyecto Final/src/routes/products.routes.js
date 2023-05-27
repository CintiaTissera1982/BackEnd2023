import  express from "express";
import {getProducts, addProducts, updProducts, delProducts} from "./controllers/product.routesController.js";

const routerProduct = express.Router();


routerProduct.get("/:pid?", getProducts);
routerProduct.post("/", addProducts);
routerProduct.put('/:pid',updProducts);
routerProduct.delete('/:pid',delProducts);


export { routerProduct }; 