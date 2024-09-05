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
import methodOverride from 'method-override'
import passport from 'passport';
import { initPassport } from './config/passport.config.js';
import routerTicket from './routers/ticketMongo.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express'

const app = express();
const PORT = 3000;

app.use(methodOverride('_method'));

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,"../", '/views'));

const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title:"Api",
            version:"1.0.0",
            description:"Documentacion ABM API"
        }
    },
    apis: ["./src/docs/*.yaml"]
}
const spec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec))
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessions({
    secret:"CoderCoder123", resave:true, saveUninitialized: true
}))

initPassport()
app.use(passport.initialize())
app.use(passport.session())

//rutas
const routeApi = express.Router();
app.use('/api', routeApi);
app.use('/', routerVistas);
//localhost:3000/api/# FS
routeApi.use('/carrito', routeCarts);
routeApi.use('/productos', routeProducts);
routeApi.use('/sessions', routeSesionRouter)

//RUTAS MONGO
routeApi.use('/products', routeProductsMongo)
routeApi.use('/carts', routecartsMongo);
routeApi.use('/ticket', routerTicket)




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
