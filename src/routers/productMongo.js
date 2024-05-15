import express from "express";
import ProductManagerMONGO from "../dao/productManagerMONGO.js";
import { isValidObjectId } from "mongoose";
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
    if (!producto.title || !producto.price || !producto.code || !producto.stock) {
        return res.send(`Error todos los campos son obligatorios`)
    }
    try {
        await prod.createProd(producto)
        res.status(200).send(`Producto agregado con exito`)
    } catch (error) {
        res.status(500).send(`Error al agregar el producto: ${error.message}`)
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
export default routeProductsMongo;