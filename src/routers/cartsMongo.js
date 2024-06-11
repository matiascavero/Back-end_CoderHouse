import express from "express";
import CartController from "../controller/cartController.js";

const routecartsMongo = express.Router();


//GET
routecartsMongo.get('/', CartController.getAll)

//END GET

//POST
routecartsMongo.post('/', CartController.metPost)

export default routecartsMongo;