import express from "express";
import CartController from "../controller/cartController.js";

const routecartsMongo = express.Router();


routecartsMongo.get('/', CartController.getAll)

routecartsMongo.post('/:cid/product/:pid', CartController.metPost)

routecartsMongo.get('/:cid', CartController.getCartById);

routecartsMongo.post('/:cid/purchase', CartController.purchaseCart);

export default routecartsMongo;