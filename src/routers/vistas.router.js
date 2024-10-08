import { Router } from 'express'
import auth from '../middleware/auth.js'
import ViewsController from '../controller/viewsController.js'
import isAdmin from '../middleware/isAdmin.js'
import isUser from '../middleware/isUser.js'

const routerVistas = Router()


routerVistas.get('/',ViewsController.getHome)

routerVistas.get('/registro', ViewsController.getRegistro)

routerVistas.get('/login', ViewsController.getLogin)

routerVistas.get('/usuarios', auth, isAdmin , ViewsController.getUsuarios)

routerVistas.get('/productos',isUser, ViewsController.getProductos)

routerVistas.get('/productosadmin', isAdmin, ViewsController.getProductosAdmin)

routerVistas.get('/perfil', auth, ViewsController.getPerfil)

routerVistas.get('/carrito',isUser, ViewsController.getCarrito)

routerVistas.get('/tickets',isUser, ViewsController.getTickets )


export default routerVistas