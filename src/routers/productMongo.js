import express from "express";
import ProductManagerMONGO from "../dao/productManagerMONGO.js";
import { isValidObjectId } from "mongoose";
import { productosModelo } from "../dao/models/productosModelo.js";
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
routeProductsMongo.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const producto = await prod.getById(pid);
        if (producto.error) {
            return res.status(404).json(producto);
        }
        return res.json(producto);
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
            error: "Error inesperado en el servidor",
            detalle: `${error.message}`
        });
    }
});

//END GET

//POST
routeProductsMongo.post('/', async (req, res) => {
    const producto = req.body;
    if (!producto.title || !producto.price || !producto.cod || !producto.stock) {
        return res.json(`Error todos los campos son obligatorios`)
    }
    try {
        await prod.createProd(producto)
        res.status(200).json(`Producto agregado con exito`)
    } catch (error) {
        res.status(500).json(`Error al agregar el producto: ${error.message}`)
    }
})
//DELETE
routeProductsMongo.delete("/:id", async(req, res)=>{
    let {id}=req.params
    if(!isValidObjectId(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese un id valido de MongoDB como argumento para busqueda`})
    }

    try {
        let resultado=await prod.deleteProd(id)
        if(resultado.deletedCount>0){
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:`Usuario con id ${id} eliminado`});
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({error:`No existen usuario con id ${id} / o error al eliminar`})
        }
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }

})
//end DELETE

//PUT

routeProductsMongo.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const updateData = req.body; // Suponiendo que los datos a actualizar están en el cuerpo de la solicitud
 
    try {
       const updatedProduct = await prod.updateProd(productId, updateData); // Llama a tu función para actualizar el producto
       res.json(updatedProduct);
    } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Error al actualizar el producto' });
    }
 });
export default routeProductsMongo;