import { ProductManager } from "../../managers/ProductManager.js";

let products = new ProductManager("/src/files/Products.json");

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

const addProducts = async (req, res) => {
  try {
    const product = req.body;
    const productAdd = await products.addProduct(product);

    return res.status(200).json({
      status: "success",
      msg: "Respuesta:",
      data: productAdd,
    });
  } catch (error) {
    console.log("Error en controller addProducts");
    return res.status(400).json({
      status: "error",
      msg: "No hay datos para mostrar",
      data: {},
    });
  }
};


const updProducts = async (req, res) => {
  try {

    const { pid } = req.params;
    const product = req.body;
    const productUpd = await products.updateProduct(pid, product);

    return res.status(200).json({
      status: "success",
      msg: "Respuesta:",
      data: productUpd,
    });
  } catch (error) {
    console.log("Error en controller updProducts");
    return res.status(400).json({
      status: "error",
      msg: "No se pudo actualizar el producto",
      data: {},
    });
  }
};

const delProducts = async (req, res) => {
  try {

    const { pid } = req.params;
    const productDel = await products.deleteProduct(pid);

    return res.status(200).json({
      status: "success",
      msg: "Respuesta:",
      data: productDel,
    });
  } catch (error) {
    console.log("Error en controller delProducts");
    return res.status(400).json({
      status: "error",
      msg: "No se pudo eliminar el producto",
      data: {},
    });
  }
};




export {
  getProducts,
  addProducts,
  updProducts,
  delProducts
};