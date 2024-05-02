import { Router } from 'express'
import ProductManagerMONGO from '../dao/productManagerMONGO.js';
const routerVistas = Router()

const prodManager = new ProductManagerMONGO();

routerVistas.get('/productos',  async(req, res) => {
    let productos
    try {
        productos = await prodManager.getAll()
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
    res.status(200).render('home', { productos: productos });
})




export default routerVistas