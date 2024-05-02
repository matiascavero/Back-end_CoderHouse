import express from "express";
import ProductManagerMONGO from "../dao/productManagerMONGO.js";

const routeProductsMongo = express.Router();

const prod = new ProductManagerMONGO();

//GET
routeProductsMongo.get('/', async (req, res) => {
    try {
        const producto = await prod.getAll()
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
routeProductsMongo.post('/', async (req, res) => {
    const producto = req.body;
    if (!producto.title,  !producto.price, !producto.code, !producto.stock) {
        return res.send(`Error todos los campos son obligatorios`)
    }
    prod.createProd(producto)
    res.status(200).send(`Producto agregado con exito`)
})

export default routeProductsMongo;