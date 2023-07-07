import {FileManager} from '../../fileManager/fileManager.js'
import {contractProducts,checkContractObject} from '../../constants/constants.js'
const products = new FileManager('/src/dataFile/Products.json')


const getProducts = async(req,res) => {
    const {id} = req.params
    const {limit} = req.query
    let outputData,getAll
    let outputCode, outputContent;
    if (id){
        outputData = await products.getById(id);
        console.log(outputData)        
        outputContent={status: "success", message:`La operacion fue exitosa. `, data: outputData};
        outputCode=200;
    }else {
        getAll = await products.getAll();
        outputData = limit != 0 && limit != undefined ? getAll.slice(0,parseInt(limit)) : getAll;        
        outputContent={status: "success", message:`La operacion fue exitosa. `, data: outputData};
        outputCode=200;
    }
    res.status(outputCode).json(outputContent);
}
const addProduct = async (req,res) =>{
    const body = req.body;
    let statusContract = checkContractObject(contractProducts,body)
    let msgResponse = '';
    let outputCode =0;  
    let contentData = await products.getAll()
    let existantData = contentData.filter(item => item.code === body.code) 
    if(existantData.length ===0){
        const outputData = statusContract ?  await products.save(body) : []
        outputData.length !== 0  ? 
            (()=>{msgResponse={status: "success", message:`La operacion fue exitosa.  `,data:outputData};outputCode=200} )() : 
            (()=>{msgResponse={status: "error", message:`No se pudo cargar el producto, datos invalidos`,data:{}};outputCode=400} )();
    }else{
        msgResponse={status: "error", message:`El producto ya existe`,data:{}};
        outputCode=400;
    }
    
    res.status(outputCode).json(msgResponse);
}
const deleteByIdProduct = async (req,res) =>{
    const {id} = req.params;
    const outputData = await products.deleteById(id)
    let msgResponse = '';
    let outputCode = 0
    outputData.length !== 0  ? 
        (()=>{msgResponse={status: "success", message:`La operacion fue exitosa.  `,data:outputData};outputCode=200} )() : 
        (()=>{msgResponse={status: "success", message:`No se pudo borrar el producto`,data:outputData};outputCode=400} )();
    res.status(outputCode).json(msgResponse);
}
const updateById = async(req,res) => {
    const {id} = req.params
    const {body} =req;
    let outputData,msgResponse,outputCode ;
    let checkResponse= checkContractObject(contractProducts,body) ;
    if (checkResponse){
        console.log(checkResponse)
        outputData = await products.updateById(id,body)
    }     
    outputData.length !==0 ? 
        (()=>{msgResponse={status: "success", message:`La operacion fue exitosa.  `,data:outputData};outputCode=200} )(msgResponse,outputData,outputCode) : 
        (()=>{msgResponse={status: "success", message:`No se pudo cargar el producto`,data:outputData};outputCode=400} )(msgResponse,outputData,outputCode);     
    res.status(outputCode).json(msgResponse);
}

const renderHome = async(req,res) => {
    const data = await products.getAll()
    res.render("home",{productos:data})
}
const realTimeProducts = (req,res) => {
    res.render("realTimeProducts",{})
}


export {getProducts,addProduct,deleteByIdProduct, updateById,renderHome,products,realTimeProducts}