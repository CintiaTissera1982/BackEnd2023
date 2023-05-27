import fs from "fs";
import {contractProducts,checkContractProductObject} from "../constants/constants.js";
import { __dirname } from "../../utils.js";
import path from "path";

class ProductManager {
  #id = 1;

  constructor(nameFile) {
    this.nameFile = path.join(__dirname, nameFile);
    if (!fs.existsSync(this.nameFile)) {
      fs.writeFile(this.nameFile, JSON.stringify([]), (msg) => {
        if (msg) {
          console.log(msg);
        }
        return;
      });
    }
  }

  addProduct = async (product) => {
    let newProduct;
    try {

      if (!checkContractProductObject(product, contractProducts)) {
        return "El producto a cargar no está completo o no respeta la estructura mínima requerida";
      }

      const codeExists = await this.getCode(product.code);

      if (codeExists) {
        return (
          "El código ingresado ya existe para el Producto: id: " +
          codeExists.id +
          " - " +
          codeExists.title
        );
      }

      //const contenido = await fs.promises.readFile(this.nameFile, "utf8");
      const contenido = await this.getProducts(); 
      if (contenido) {
        //const productos = JSON.parse(contenido);
        const lastIdAdded = contenido.reduce(
          (acc, item) => (item.id > acc ? (acc = item.id) : acc),
          0
        );
        newProduct = {
          id: lastIdAdded + 1,
          ...product,
        };
        contenido.push(newProduct);
        this.#id = newProduct.id;
        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify(contenido, null, 2)
        );
      } else {
        //si no existe ningún contenido en el archivo
        newProduct = {
          id: this.#id,
          ...product,
        };

        //creamos el archivo
        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify([newProduct], null, 2)
        );
      }
    } catch (error) {
      console.log(error);
    }

    return newProduct;
  };

  getProducts = async () => {
    try {
      const contenido = await fs.promises.readFile(this.nameFile, "utf8");
      if (contenido) {
        const productos = JSON.parse(contenido);
        if (productos) {
          return productos;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (id) => {
    try {
      const contenido = await fs.promises.readFile(this.nameFile, "utf8");
      if (contenido) {
        const productos = JSON.parse(contenido);
        const producto = productos.find((item) => item.id === parseInt(id));
        if (producto) {
          return producto;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (id, body) => {
    try {
      if (!checkContractProductObject(body, contractProducts)) {
        return "El producto a cargar no está completo o no respeta la estructura mínima requerida";
      }

      const productos = await this.getProducts();
      const productPos = productos.findIndex((p) => p.id == parseInt(id));

      if (productPos >= 0) {
        productos[productPos] = {
          id: parseInt(id),
          ...body,
        };
        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify(productos, null, 2)
        );
        return productos[productPos];
      } else {
        return "No existe el producto : '" + id + "' en el archivo";
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      //const contenido = await fs.promises.readFile(this.nameFile, "utf8");
      const contenido = await this.getProducts(); 
      //const productos = JSON.parse(contenido);
      const productPos = contenido.findIndex((p) => p.id == parseInt(id));

      if (productPos === -1) {
        return "No existe el producto : '" + id + "' en el archivo";
      } else {
        const newProducts = contenido.filter(
          (item) => item.id !== parseInt(id)
        );
        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify(newProducts, null, 2)
        );
        return "Producto '" + id + "' eliminado con  éxito";
      }
    } catch (error) {
      console.log(error);
    }
  };

  getCode = async (codeNew) => {
    try {
      //const contenido = await fs.promises.readFile(this.nameFile, "utf8");
      const contenido = await this.getProducts(); 
      if (contenido) {
        //const productos = JSON.parse(contenido);
        const producto = contenido.find((item) => item.code === codeNew);
        return producto;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export { ProductManager };
