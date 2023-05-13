const ProductManager = require('../../product/ProductManager.js');

let products 
const createManager= ()=>{
    try{
        console.log('Por crear new product manager')
        products = new ProductManager('./Products.txt');}
    
    catch(error){
        console.log('Error en new ProductManager')
    }
}


const getAllProducts = (async(req,res)=>{
    try{
        const allProducts = await products.getProducts();
        res.send(JSON.stringify(allProducts))
    }
    catch(error){
        console.log(error)
        console.log('Error en controller getAllProducts');
        res.send({
            error: -1,
            message: 'Error al obtener todos los productos en /productos'
        })
    }

})

const getProductsById = (async(req,res)=>{
    try{
        
        const {id} = req.params;
        const productById = await products.getProductById(parseInt(id))
        res.send(JSON.stringify(productById))
    }catch(error){
        console.log('Error en controller getProductsByid')
        res.send({error:-1, message:`Error al buscar el producto ${id}`});
    }
})

const getOnlyAFewProducts= (async(req,res) =>{
    try{
        
        const {limit} =req.query
        console.log(req.query)
        if (limit){
            const allProducts = await products.getProducts();
            const onlyAFew = allProducts.slice(0,parseInt(limit));
            console.log('Obteniendo solo el total de: '+limit)
            console.log(onlyAFew)
            res.send(JSON.stringify(onlyAFew))
        }
        else{
            res.send(await getAllProducts(req,res))
        }

    }catch(error){
        console.log('Error en controller getOnlyAFew')
        res.send({error:-1,message:`Error al buscar la cantidad de ${limit}`})
    }

})

module.exports = {getAllProducts,getOnlyAFewProducts,getProductsById,createManager}