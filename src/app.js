import express from 'express';
import routeProducts from './routers/products.js';
import routeCarts from './routers/carts.js';
const app = express();
const PORT = 8080 ;

app.use(express.json());
const routeApi = express.Router();
app.use('/api', routeApi);
routeApi.use('/products', routeProducts)
routeApi.use('/carts', routeCarts)

app.get('/', (req, res) => {
    res.send('hola esta es la pagina principal')
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})

