import express from "express";
import ProductoController from "../controller/productoController.js";

const routeProductsMongo = express.Router();




routeProductsMongo.get('/', ProductoController.getAll)

routeProductsMongo.get('/mockingproducts', ProductoController.faker)

routeProductsMongo.get('/:pid', ProductoController.getProdId);

routeProductsMongo.post('/', ProductoController.createProd)

routeProductsMongo.delete("/:id", ProductoController.deleteProd)

routeProductsMongo.put('/:id', ProductoController.putProd);



export default routeProductsMongo;