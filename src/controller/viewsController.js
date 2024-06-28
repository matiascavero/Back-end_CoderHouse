
import UsuariosManagerMongo from "../dao/usuariosManagerMongo.js"
import ProductManagerMONGO from "../dao/productManagerMONGO.js"


const usuarioMan = new UsuariosManagerMongo();
const productos = new ProductManagerMONGO()

class ViewsController {
    //home
    static getHome = (req, res) => {
        res.status(200).render('home')
    }


    //registro
    static getRegistro = (req, res) => {
        const mensaje = req.query.mensaje || '';
        res.status(200).render('registro', { mensaje });
    }
    //login
    static getLogin = (req, res) => {
        res.status(200).render('login')
    }
    //usuarios
    static getUsuarios = async (req, res)=>{
        try {
         const usuarios = await usuarioMan.getAll()
         res.status(200).render('usuarios', {usuarios})
        } catch (error) {
         console.error(masage.error)
        }
     }
    //productos
    static getProductos = async(req, res)=>{
        try {
          const prods = await productos.getAll()
          res.status(200).render('productos', {prods})
        } catch (error) {
          console.error(masage.error)
        }
      }
      //productosAdmin
    static getProductosAdmin = async(req, res)=>{
      const{ productoagregado } = req.query
      
      try {
        const prods = await productos.getAll()
        res.status(200).render('productosadmin', {prods,productoagregado})
      } catch (error) {
        console.error(masage.error)
      }
    }
    //perfil
    static getPerfil = (req, res)=>{
        const usuario =  req.session.usuario
        res.status(200).render('perfil', {usuario})
        
    }
}





export default ViewsController