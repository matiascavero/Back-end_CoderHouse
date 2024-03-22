import express from 'express';
import ProductManager from './productClass.js';

const app = express();
const PORT = 3000;

app.get('/productos', async(req, res)=>{
    const {limit} = req.query;
    const prod = new ProductManager()
    const producto = await prod.getProducts(limit)
    res.json(producto)

})


app.get('/productos/:pid', async (req, res)=>{
    const {pid} = req.params;
    const prod = new ProductManager();
    const producto = await prod.getProductsId(Number(pid))
    res.json(producto)
})


app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})
