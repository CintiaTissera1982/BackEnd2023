import fs from "fs";
import path from "path";

import { __dirname } from "../../utils.js";

class FileManager {
  constructor(fileName) {
    this.fileName = path.join(__dirname, fileName);

    if (!fs.existsSync(this.fileName)) {
      (async () => {
        try {
          await fs.promises.writeFile(this.fileName, JSON.stringify([]));
        } catch (error) {
          console.log(error)
          console.log("Error al crear el archivo " + this.fileName);
        }
      })();
    }
  }

  getAll = async () => {
    const fileContent = await fs.promises.readFile(this.fileName, "utf8");
    const parsedContent = JSON.parse(fileContent);
    return parsedContent;
  };

  getById = async (id) => {
    const fileContent = await this.getAll();
    console.log(fileContent)    
    const data = fileContent.find(item => item.id === parseInt(id));
    console.log('mostrando data')
    console.log(data)  
    return data;
  };

  save = async (newObject) => {
    const data = await this.getAll();
    const lastId = data.reduce((acc, item) => (item.id > acc ? (acc = item.id) : acc), 0 );
    const newToAdd = {
      id: lastId + 1,
      ...newObject,
    };     
    data.push(newToAdd);
    await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
    return data;
  };

  deleteById = async (id) => {
    const fileContent = await this.getAll();
    const newFileContent = fileContent.filter((item) => item.id !== parseInt(id));
    await fs.promises.writeFile(this.fileName, JSON.stringify(newFileContent, null, 2));
    return newFileContent;
  };

  deleteAll =  async  () => {
    await fs.promises.writeFile(this.fileName, JSON.stringify([]));
     
  };

  updateById = async (id, body) => {
    const fileContent = await this.getAll();
    const contentPosition = fileContent.findIndex((element) => element.id === parseInt(id) );    
    fileContent[contentPosition] = {
      id: parseInt(id),
      ...body,
    };
    console.log(fileContent[contentPosition])
    await fs.promises.writeFile(this.fileName,JSON.stringify(fileContent,null,2))
    return fileContent;
  };
  updateNestedById = async (id, body) => {
    const fileContent = await this.getAll();
    const contentPosition = fileContent.findIndex((element) => element.id === parseInt(id) );    
    fileContent[contentPosition] = {
      id: parseInt(id),
      products: body,
    };
    console.log(fileContent[contentPosition])
    await fs.promises.writeFile(this.fileName,JSON.stringify(fileContent,null,2))
    return fileContent;
  };

  saveNestedObjectById = async (id,idProd) => {
    const contentById   = await this.getById(id);
    console.log(`Mostrando contentById ${contentById}`)
    const oldProducts   = contentById.products;
    const lastId        = oldProducts.length    
    const existsProduct = oldProducts.findIndex((element) => element.id === parseInt(idProd))
    if(existsProduct ===-1){
      oldProducts[lastId]= {
        id:parseInt(idProd),
        quantity: 1
      }
    }else{
      const actualQuantity =oldProducts[existsProduct].quantity;
      oldProducts[existsProduct] = {
        id: parseInt(idProd),
        quantity: actualQuantity + 1
      }
    }
    const updatedChart = await this.updateNestedById(id,oldProducts)
    return updatedChart;    
  };

}

export {FileManager};
