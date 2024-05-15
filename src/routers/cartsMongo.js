import express from "express";
import CartsManagerMONGO from "../dao/cartManagerMongo.js";

const routecartsMongo = express.Router();

const cart = new CartsManagerMONGO();

//GET
routecartsMongo.get('/', async (req, res) => {
    try {
        const producto = await cart.getAll()
        res.json(producto)
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json(
            {
                error:"error inesperado en el servidor",
                detalle:`${error.masage}`
            }
        )
    }

})

//END GET

//POST
routecartsMongo.post('/', async (req, res) => {
    const carts = req.body;
    for (const product of carts.products) {
        if (!product.id || !product.quantity) {
            return res.send(`Error: Todos los campos (id y cantidad) son obligatorios para cada producto`);
        }
    }
    try {
        cart.createCart(carts)
        res.status(200).send(`Producto agregado con exito`)
    } catch (error) {
        res.status(500).send(`Error al agregar el producto: ${error.message}`)
    }
 
})

export default routecartsMongo;