import express from "express";
import CartsManager from "../dao/cartClass.js";

const routeCarts = express.Router();

const c = new CartsManager()

routeCarts.get('/:cid', (req, res) => {
    const { cid } = req.params;
    if (isNaN(cid)) {
        return res.send(`error el id tiene que ser de tipo numerico`)
    }
    else if (cid == '') {
        return c.getCarts();
    }
    else {
        const result = c.getCartId(Number(cid));
        return res.json(result);
    }
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