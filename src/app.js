import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sessions from 'express-session';
import path from 'path';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override';
import passport from 'passport';
import { initPassport } from './config/passport.config.js';
import { fileURLToPath } from 'url';

// Importa las rutas
import routeProducts from './routers/productsFs.js';
import routeCarts from './routers/cartsFS.js';
import routerVistas from './routers/vistas.router.js';
import routeProductsMongo from './routers/productMongo.js';
import routecartsMongo from './routers/cartsMongo.js';
import routerTicket from './routers/ticketMongo.js';
import routeSesionRouter from './routers/sesion.router.js';

// Configura dotenv
dotenv.config();

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializa la aplicación
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// Configura Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../', '/views'));

// Configura el middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

// Configura sesiones
app.use(sessions({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

// Configura Passport
initPassport();
app.use(passport.initialize());
app.use(passport.session());

// Configura Swagger
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Api",
            version: "1.0.0",
            description: "Documentacion ABM API"
        }
    },
    apis: ["./src/docs/*.yaml"]
};
const spec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec));

// Configura las rutas
const routeApi = express.Router();
app.use('/api', routeApi);
app.use('/', routerVistas);

// Rutas FS
routeApi.use('/carrito', routeCarts);
routeApi.use('/productos', routeProducts);
routeApi.use('/sessions', routeSesionRouter);

// Rutas MongoDB
routeApi.use('/products', routeProductsMongo);
routeApi.use('/carts', routecartsMongo);
routeApi.use('/ticket', routerTicket);

// Conecta a la base de datos y arranca el servidor
const connDB = async () => {
    try {
        if (!MONGO_URL) {
            throw new Error('MONGO_URL no está definida en el archivo .env');
        }
        await mongoose.connect(MONGO_URL);
        console.log("DB Online...!!!");
    } catch (error) {
        console.log("Error al conectar a DB", error.message);
    }
};

connDB();

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
