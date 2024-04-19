import {Router } from 'express'
import ProductosManager from '../dao/productClass.js'
const routerVistas = Router()

const prodManager = new ProductosManager();

routerVistas.get('/', (req,res)=>{
    let productos
    try {
        productos= prodManager.getProducts();
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json(
            {
                error: 'Error inesperado en el servidor - Intente mas tarde'
            }
        )
        
    }
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('home',{ productos: productos });
})




export default routerVistas