import express from 'express';
import ProductManager from './productClass.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('hola esta es la pagina principal')
})

const prod = new ProductManager();

app.get('/productos', async (req, res) => {
    const { limit } = req.query;
    const producto = await prod.getProducts(limit)
    res.json(producto)

})

app.get('/productos/:pid', async (req, res) => {
    const { pid } = req.params;
    if(isNaN(pid)){
        return res.send('Error, el id tiene que ser numerico')
    }
    const producto = await prod.getProductsId(Number(pid))
    res.json(producto)
})


app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})
