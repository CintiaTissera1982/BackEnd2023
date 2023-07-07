import { FileManager } from "../../fileManager/fileManager.js";


const cart     = new FileManager('/src/dataFile/Cart.json');
const products = new FileManager('/src/dataFile/Products.json')

const addCart = async(req,res)=>{
    let outputObject,outputCode
    const product = { products:[]}
    const outputData = await cart.save(product)
    outputObject ={status: "success", message:`La operacion fue exitosa.  `,data:outputData};
    outputCode=200        
    res.status(outputCode).json(outputObject);       

}
const getCart = async(req,res) => {
    let outputObject, outputCode
    const {cid} = req.params
    const cartById = await cart.getById(cid)
    console.log(cartById)
    cartById ? 
        (()=>{outputObject ={status:"success",message:"Carrito encontrado con exito", data:cartById}; outputCode = 200})(outputObject,outputCode,cartById) :
        (()=>{outputObject ={status:"error",message:"Carrito no encontrado", data:{}}; outputCode = 400})(outputObject,outputCode)    
    res.status(outputCode).json(outputObject)
}
const putProductToCart = async (req,res) =>{
    let outputObject, outputCode
    try{          
        const {cid,pid} = req.params           
        const outputData  = await cart.saveNestedObjectById(cid,pid)
        outputCode = 200;
        outputObject ={
            status:"success",
            message: "Producto agregado con exito",
            data:outputData
        }
    }catch(error){
        console.log(error)
        outputCode = 400;
        outputObject= {status:"error",message: "No fue posible agregar el producto al carrito",data: {}}


    }
    res.status(outputCode).json(outputObject);
  
}


export {addCart,getCart,putProductToCart}