import fs from 'fs';
import { __dirname } from '../../utils.js';
import path from 'path';



class CartManager {

  #id = 1;

  constructor(nameFile) {

    this.nameFile = path.join(__dirname,nameFile);
    if (!fs.existsSync(this.nameFile)) {
      fs.writeFile(this.nameFile, JSON.stringify([]),(msg)=>{
        if(msg){
          console.log(msg)
        }
        return;
      });
    }
  }

  addCart = async () => {
    let newCart;
    try {
        const productos = { productos: [] }
        //const contenido = await fs.promises.readFile(this.nameFile, "utf8");
        const contenido = await this.getCarts();

        if (contenido) {
          //const carts = JSON.parse(contenido);
          const lastIdAdded = contenido.reduce(
            (acc, item) => (item.id > acc ? (acc = item.id) : acc),
            0
          );
          newCart = {
            id: lastIdAdded + 1,
            ...productos,
          };
          contenido.push(newCart);
          this.#id = newCart.id;
          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify(contenido, null, 2)
          );
        } else {
          //si no existe ningún contenido en el archivo
          newCart = {
            id: this.#id,
            ...productos,
          };

          //creamos el archivo
          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify([newCart], null, 2)
          );
        }

    } catch (error) {
      console.log(error);
    }
    return newCart;
  };


  addProductCart = async (cid,pid) => {
    try {
        //Aca recibo el id de carrito y el id de producto a agregar, debo validar: 
        //1- que el carrito exista,
        //2- que el producto exista en el carrito, 
        //3- SI el producto existe en el carrito, sumarle 1 si no lo agregamos al carrito con cantidad 1
        const contenido = await this.getCarts();

        if (contenido) {
          const carrito = contenido.find((item) => item.id === parseInt(cid));
          if (carrito) {
            //carrito existe, busco producto
            const arrayProducto = carrito.productos
            const longActual = arrayProducto.length
            const existProduct = arrayProducto.findIndex((element) => element.idProduct === parseInt(pid))
            console.log(existProduct)
            if(existProduct ===-1){
              arrayProducto[longActual]= {
                idProduct:parseInt(pid),
                quantity: 1
              }
            }else{
              const actualQuantity =arrayProducto[existProduct].quantity;
              console.log(actualQuantity);
              arrayProducto[existProduct] = {
                idProduct: parseInt(pid),
                quantity: actualQuantity + 1
              }
            }
            const updateCart = await this.updateCart(cid, arrayProducto)
            return updateCart;
          }else{
            //return "El carrito "
            return "No existe el carrito : '" + cid + "' en el archivo";

          }
          
        }


    } catch (error) {
      console.log(error);
    }

   // return updateCart;
  };


  updateCart = async (id, body) => {
    try {
      const carts = await this.getCarts();
      const cartPos = carts.findIndex((p) => p.id == parseInt(id));

      if (cartPos >= 0) {
        carts[cartPos] = {
          id: parseInt(id),
          productos: body
        };
        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify(carts, null, 2)
        );
        return carts[cartPos];
      } 
    } catch (error) {
      console.log(error);
    }
  };  

   getCarts = async () => {
    try {
      const contenido = await fs.promises.readFile(this.nameFile, "utf8");
      if (contenido) {
        const carts = JSON.parse(contenido);
        if (carts) {
          return carts;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

   getCartById = async (id) => {
    try {
      const contenido = await this.getCarts();
      if (contenido) {
        const carrito = contenido.find((item) => item.id === parseInt(id));
        if (carrito) {
          return carrito;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }; 
 
 
}

export { CartManager};