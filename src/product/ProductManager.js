const fs = require("fs");
const constants = require('../constants/constants.js')

 class ProductManager{
    
    #id = 1

    constructor(nameFile){
         this.path = nameFile;

         const createFile = async()=>{
            if(!fs.existsSync(this.path)){
                await fs.promises.writeFile(this.path, JSON.stringify([]))
            }
        }

        createFile()

     }

     
     addProduct = async(product)=>{

        let newProduct;
        try {

            const aKeys= Object.keys(constants.contractProducts).sort();
            const bKeys= Object.keys(product).sort(); 

            if(JSON.stringify(aKeys)===JSON.stringify(bKeys)){
                //Verificar si existe el archivo
                
                    
                    const checkEmpty = Object.values(product).every(value => !!value)
                    if ( !checkEmpty){       
                    
                        console.log('El producto a cargar no está completo')
                        return false; 
                    }
                                    
                    const productExists = await this.getCode(product.code)

                    if(productExists){
                        console.log('El código de producto ya existe para el producto: id: ' + productExists.id + ' - ' + productExists.title )
                        return false; 
                    }
                    
                    const contenido = await fs.promises.readFile(this.path,"utf8");

                    if(contenido){
                        const productos = JSON.parse(contenido);
                        const lastIdAdded = productos.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                        newProduct={
                            id: lastIdAdded+1,
                            ...product
                        }                    
                        productos.push(newProduct);                    
                        this.#id=newProduct.id
                        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
                    
                    } else{
                        //si no existe ningún contenido en el archivo
                        newProduct={
                        id:this.#id,                        
                            ...product
                        }

                        //creamos el archivo
                        await fs.promises.writeFile(this.path, JSON.stringify([newProduct], null, 2))
                        
                    }

                
            }else{
                console.log('El producto no cumple la estructura minima requerida')
            }


         } catch (error) {
             console.log(error);
         }
         
         return newProduct;
         
     }

     getProducts = async()=>{
        try {
            const contenido = await fs.promises.readFile(this.path,"utf8");
            const productos = JSON.parse(contenido);
            return productos
        } catch (error) {
            console.log(error)
        }
    }
 
    getProductById = async(id)=>{
        try {
            if(fs.existsSync(this.path)){
                const contenido = await fs.promises.readFile(this.path,"utf8");
                if(contenido){
                    const productos = JSON.parse(contenido);
                    const producto = productos.find(item=>item.id===id);
                    
                    //if (typeof producto === "undefined") {
                    if (!producto) {    
                        return "No existe el producto : '" + id + "' en el archivo"
                    }else{
                        return producto
                    }                    
                } else{
                    return "El archivo esta vacio"
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    updateProduct = async(id,body)=>{
        try {

            const aKeys= Object.keys(this.#contractProducts).sort();
            const bKeys= Object.keys(body).sort(); 

            if(JSON.stringify(aKeys)===JSON.stringify(bKeys)){
                const checkEmpty = Object.values(body).every(value => !!value)
                if ( !checkEmpty){       
                
                    console.log('El producto a cargar no está completo')
                    return false; 
                }
                const productos = await this.getProducts();
                const productPos = productos.findIndex(elm=>elm.id === id);
                
                if (productPos >= 0 ) {
                    
                    productos[productPos] = {
                        id:id,
                        ...body
                    };
                    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
                    return productos;
                }else  {
    
                    console.log("No existe el producto : '" + id + "' en el archivo")
                }                 

            }else{
                console.log('El producto no cumple la estructura minima requerida')
            }

        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async(id)=>{
        try {
            const contenido = await fs.promises.readFile(this.path,"utf8");
            const productos = JSON.parse(contenido);
            const productPos = productos.findIndex(elm=>elm.id === id);
            
            if (productPos === -1) {
                console.log("No existe el producto : '" + id + "' en el archivo")

            }else{
                const newProducts = productos.filter(item=>item.id!==id);
                await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2));
             
            }        
        } catch (error) {
            console.log(error)
        }
    }

    getCode = async(codeNew)=>{
        try {
            if(fs.existsSync(this.path)){
                const contenido = await fs.promises.readFile(this.path,"utf8");

                if(contenido){
                    const productos = JSON.parse(contenido);
                    const producto = productos.find(item=>item.code===codeNew);
                    return producto
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
 
module.exports=ProductManager;