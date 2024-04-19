import express from "express";
import ProductManager from '../dao/productClass.js'

const routeProducts = express.Router();

const prod = new ProductManager();

//GET
routeProducts.get('/', async (req, res) => {
    const { limit } = req.query;
    const producto = await prod.getProducts(limit)
    res.json(producto)

})
routeProducts.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    if (isNaN(pid)) {
        return res.send('Error, el id tiene que ser numerico')
    }
    const producto = await prod.getProductsId(Number(pid))
    res.json(producto)
})
//END GET

//POST
routeProducts.post('/', async (req, res) => {
    const producto = req.body;
    if (!producto.title, !producto.description, !producto.price, !producto.code, !producto.stock, !producto.category) {
        return res.send(`Error todos los campos son obligatorios`)
    }
    prod.addProduct(producto.title, producto.description, producto.price, producto.code, producto.stock, producto.category)
    res.status(200).send(`Producto agregado con exito`)
})
//PUT
routeProducts.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const producto = req.body;
    const id = Number(pid)
    if (!producto.title, !producto.description, !producto.price, !producto.code, !producto.stock, !producto.category) {
        return res.send(`Error todos los campos son obligatorios`)
    }
    prod.updateProduct(id, producto)
    return res.send(`El producto con el id ${id} se modifico correctamente`)

})
//DELETE
routeProducts.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    const id = Number(pid)
    try {
        const message = await prod.deleteProduct(id)
        res.json({
            status: 'success',
            message: message,
            data: { id }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message,
        });

    }


})

export default routeProducts;