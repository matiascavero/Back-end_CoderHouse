import UsuariosManagerMongo from "../dao/usuariosManagerMongo.js"
import ProductManagerMONGO from "../dao/productManagerMONGO.js"
import CartsManagerMONGO from "../dao/cartManagerMongo.js";
import TicketManagerMongo from "../dao/ticketManagerMongo.js";

const usuarioMan = new UsuariosManagerMongo();
const productos = new ProductManagerMONGO()
const carrito = new CartsManagerMONGO()
const ticketsMongo = new TicketManagerMongo()
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
    //carrito
    static getCarrito = async (req,res) =>{
     const carritos = await carrito.getAll()
    
     res.status(200).render('carrito', {carritos})
    }

    static getTickets = async (req,res)=>{
      const { email } = req.user
      const tickets = await ticketsMongo.getTick({purcharser: email})
      res.status(200).render('ticket', {tickets})
    }
}





export default ViewsController