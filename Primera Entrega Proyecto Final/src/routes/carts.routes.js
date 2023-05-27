import  express from "express";
import {addCarts, addProductCart, getCartByID} from "./controllers/cart.routesController.js";

const routerCart = express.Router();


routerCart.get("/:cid?", getCartByID);
routerCart.post("/", addCarts);
routerCart.post("/:cid/product/:pid", addProductCart);

export { routerCart }; 