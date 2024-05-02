import express from 'express';
import routeProducts from './routers/productsMemory.js';
import routeCarts from './routers/cartsMemory.js';
import { engine } from 'express-handlebars';
import path from 'path';
import routerVistas from './routers/vistas.router.js';
import __dirname from './utils/utils.js';
import mongoose from 'mongoose';
import routeProductsMongo from './routers/productMongo.js'
import routecartsMongo from './routers/cartsMongo.js';

const app = express();
const PORT = 3000;



app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,"../", '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
const routeApi = express.Router();
app.use('/api', routeApi);
app.use('/', routerVistas);
//fs
routeApi.use('/carrito', routeCarts);
routeApi.use('/productos', routeProducts);

//localhost:3000/api/#
//mongo
routeApi.use('/mongo/products', routeProductsMongo)
routeApi.use('/mongo/carts', routecartsMongo);
//localhost:3000/api/mongo/#



app.listen(PORT, () => { 
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

const connDB=async()=>{
    try {
     
        await mongoose.connect(
            "mongodb+srv://backendcoder:codercoder@cluster0.67nagvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            {
                dbName:"ecommerce"
            }
        )
        console.log("DB Online...!!!")

    } catch (error) {
        console.log("Error al conectar a DB", error.message)
    }
}

connDB();
