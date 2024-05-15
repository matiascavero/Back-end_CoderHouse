import express from 'express';
import routeProducts from './routers/productsFs.js';
import routeCarts from './routers/cartsFS.js';
import { engine } from 'express-handlebars';
import path from 'path';
import routerVistas from './routers/vistas.router.js';
import __dirname from './utils/utils.js';
import mongoose from 'mongoose';
import routeProductsMongo from './routers/productMongo.js'
import routecartsMongo from './routers/cartsMongo.js';
import sessions from "express-session"
import routeSesionRouter from './routers/sesion.router.js';
const app = express();
const PORT = 3000;



app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,"../", '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessions({
    secret:"CoderCoder123", resave:true, saveUninitialized: true
}))
//rutas
const routeApi = express.Router();
app.use('/api', routeApi);
app.use('/', routerVistas);
//localhost:3000/api/#
routeApi.use('/carrito', routeCarts);
routeApi.use('/productos', routeProducts);
routeApi.use('/sessions', routeSesionRouter)

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
