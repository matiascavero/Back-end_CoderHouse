import { Router } from 'express'
import auth from '../middleware/auth.js'
import ViewsController from '../controller/viewsController.js'

const routerVistas = Router()



routerVistas.get('/',ViewsController.getHome)

routerVistas.get('/registro', ViewsController.getRegistro)

routerVistas.get('/login', ViewsController.getLogin)

routerVistas.get('/usuarios', auth, ViewsController.getUsuarios)

routerVistas.get('/productos', ViewsController.getProductos)

routerVistas.get('/perfil', auth, ViewsController.getPerfil)




export default routerVistas