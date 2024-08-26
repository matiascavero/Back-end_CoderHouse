import express from "express";
import CartController from "../controller/cartController.js";

const routecartsMongo = express.Router();


routecartsMongo.get('/', CartController.getAll)

routecartsMongo.post('/:productId', CartController.metPost)

export default routecartsMongo;