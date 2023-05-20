const express = require('express');
const router = require('./routes/routes.js')

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/',router.router);
app.use('*', async(req,res)=>{
    res.json({
        error:-1,
        message:'La ruta es invalida'
    })
})
app.listen('8080',console.log('Escuchando puerto 8080'));