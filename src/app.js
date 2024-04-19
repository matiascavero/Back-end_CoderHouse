import express from 'express';
import routeProducts from './routers/products.js';
import routeCarts from './routers/carts.js';
import { engine } from 'express-handlebars';
import path from 'path';
import routerVistas from './routers/vistas.router.js';
import __dirname from './utils/utils.js';


const app = express();
const PORT = 3000;


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,"../", '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routeApi = express.Router();
app.use('/api', routeApi);
app.use('/', routerVistas); 

routeApi.use('/products', routeProducts);
routeApi.use('/carts', routeCarts);


app.listen(PORT, () => { 
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});


