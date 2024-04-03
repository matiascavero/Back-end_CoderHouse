import express from "express";
import CartsManager from "../cartClass.js";

const routeCarts = express.Router();

const c = new CartsManager()

routeCarts.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const result = c.getCartId(Number(cid));
    return res.json(result);
});

routeCarts.post('/', (req, res) => {

    const result = c.createCart()
    return res.json(result)
});

routeCarts.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params
    const result = c.addProductInCart(Number(cid), Number(pid))
    return res.json(result)
});






export default routeCarts