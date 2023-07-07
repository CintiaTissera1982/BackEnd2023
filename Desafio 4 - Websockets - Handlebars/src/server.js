import express from 'express';
import { router } from "./routes/routes.js";
import { __dirname } from '../utils.js';
import handlebars from 'express-handlebars'
import path from 'path'
import {Server} from 'socket.io'
import { products } from './routes/controllers/productController.js';


const app = express();

const viewsDirectory = path.join(__dirname,'/src/views');
const publicDirectory = path.join(__dirname,"/public")
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("handlebars",handlebars.engine());
app.set("views", viewsDirectory)
app.set("view engine","handlebars")

app.use(express.static(publicDirectory))

app.use('/',router);
app.use('*', async(req,res)=>{
    res.status(404).json({
        status:"error",
        message:"La ruta es invalida",
        data: {}
    })
})
const httpServer = app.listen('8080',() =>{
    console.log('Escuchando puerto 8080 ')
});

const socketServer = new Server(httpServer)

socketServer.on("connection",async(socket) =>{
    
    socketServer.emit("realtimeproducts",await products.getAll())
    socket.on("newProduct", async(data) =>{
       const dataSaved = await products.save(data)
       console.log(data)
       socketServer.emit("realtimeproducts",dataSaved);
    })

    socket.on("deleteProduct", async(data) =>{
        const dataSaved = await products.deleteById(data)
        const allProducts = await products.getAll()
        socketServer.emit("realtimeproducts",allProducts);
     })


})
