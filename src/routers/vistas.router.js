import { Router } from 'express'
import auth from '../middleware/auth.js'
import UsuariosManagerMongo from '../dao/usuariosManagerMongo.js'
import ProductManagerMONGO from '../dao/productManagerMONGO.js';

const routerVistas = Router()

const usuarioMan = new UsuariosManagerMongo();
const productos = new ProductManagerMONGO()
routerVistas.get('/', (req, res)=>{
    res.status(200).render('home')
})

routerVistas.get('/registro', (req, res)=>{
    const mensaje = req.query.mensaje || '';
    res.status(200).render('registro', { mensaje });
})

routerVistas.get('/login', (req, res)=>{
    res.status(200).render('login')
})
routerVistas.get('/usuarios', auth, async (req, res)=>{
   try {
    const usuarios = await usuarioMan.getAll()
    res.status(200).render('usuarios', {usuarios})
   } catch (error) {
    console.error(masage.error)
   }
})
routerVistas.get('/productos', async(req, res)=>{
  try {
    const prods = await productos.getAll()
    res.status(200).render('productos', {prods})
  } catch (error) {
    console.error(masage.error)
  }
})

routerVistas.get('/perfil', auth, (req, res)=>{
    const usuario =  req.session.usuario
    res.status(200).render('perfil', {usuario})
    
})




export default routerVistas