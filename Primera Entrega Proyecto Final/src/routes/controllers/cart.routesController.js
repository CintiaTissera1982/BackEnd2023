import { CartManager } from "../../managers/CartManager.js";
import { ProductManager } from "../../managers/ProductManager.js";

let carts = new CartManager("/src/files/Carts.json");
let products = new ProductManager("/src/files/Products.json");

 const getCartByID = async (req, res) => {
  const { cid } = req.params;
  try {
    if (cid) {
      const carttById = await carts.getCartById(parseInt(cid));

      if (carttById) {
        return res.status(200).json({
          status: "success",
          msg: "carrito encontrado con éxito",
          data: carttById,
        });
      } else {
        return res.status(400).json({
          status: "error",
          msg: `No existe el carrito :   ${cid}  en el archivo`,
          data: {},
        });
      }
    } 
  } catch (error) {
    console.log("Error en controller getCartByID");
    return res.status(400).json({
      status: "error",
      msg: "No hay datos para mostrar",
      data: {},
    });
  }
}; 

const addCarts = async (req, res) => {
 
  try {
    const cartAdd = await carts.addCart();
    return res.status(200).json({
      status: "success",
      msg: "Respuesta:",
      data: cartAdd,
    });
  } catch (error) {
    console.log("Error en controller addCarts");
    return res.status(400).json({
      status: "error",
      msg: "No hay datos para mostrar",
      data: {},
    });
  }
};

const addProductCart = async (req, res) => {
    const { pid } = req.params
    const { cid } = req.params
    try {
      
        //Controlo que exista el producto en Products.json
      const producto = await products.getProductById(pid);
      
      if (producto) {
        //existe
        const ProductAddtoCart = await carts.addProductCart(cid,pid);
        return res.status(200).json({
          status: "success",
          msg: "Respuesta:",
          data: ProductAddtoCart,
        });
      }  else{
        return res.status(400).json({
            status: "error",
            msg: `No existe el producto :   ${pid}  en el archivo`,
            data: {}
             
          });

      }

    } catch (error) {
      console.log("Error en controller addProductCart");
      console.log(error)
      return res.status(400).json({
        status: "error",
        msg: "No hay datos para mostrar",
        data: {},
      });
    }
  };




export {
  
    addCarts,
    addProductCart,
    getCartByID,
  
};