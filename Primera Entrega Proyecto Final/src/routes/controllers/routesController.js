const ProductManager = require("../../product/ProductManager.js");

let products = new ProductManager("./Products.txt");

const getProducts = async (req, res) => {
  const { limit } = req.query;
  const { pid } = req.params;
  //si el limite existe, entonces busco por limite 
  //si no, controlo si el id existe
  //si no existe ninguno, devuelvo todo
  try {
    if (pid) {
      const productById = await products.getProductById(parseInt(pid));

      if (productById) {
        return res.status(200).json({
          status: "success",
          msg: "producto encontrado con éxito",
          data: productById,
        });
      } else {
        return res.status(400).json({
          status: "error",
          msg: `No existe el producto :   ${pid}  en el archivo`,
          data: {},
        });
      }
    } else {
      const allProducts = await products.getProducts();
      const max = limit ? parseInt(limit) : allProducts.length;
      const onlyAFew = allProducts.slice(0, max);
      console.log(onlyAFew)
      return res.status(200).json({
        status: "success",
        msg: "productos encontrados con exito. Cantidad: " + onlyAFew.length,
        data: onlyAFew,
      });
    }

  } catch (error) {
    console.log("Error en controller getProducts");
    return res.status(400).json({
      status: "error",
      msg: "No hay datos para mostrar",
      data: {},
    });    
  }
 
};


module.exports = {
  getProducts,
};
