import CartsManagerMONGO from "../dao/cartManagerMongo.js";
import TicketManagerMongo from "../dao/ticketManagerMongo.js";

const carrito = new CartsManagerMONGO()
const ticketMongo = new TicketManagerMongo()

class TicketController {
    
    static ticketPost = async(req,res)=>{
        const cart = await carrito.getAll()
        
     
        const codigo = (Math.random() * Math.random() + Math.random()).toString()
        const code = codigo.slice(2 , 8)
        const purcharse_datatime = new Date()
        const amount = cart[0].total;
        const purchaser = cart[0].email;
       
        const ticket = {
            code,
            purcharse_datatime,
            amount,
            purchaser
        }
        ticketMongo.create(ticket)
       
         carrito.deleteCart(cart[0]._id)
        res.status(200).json('Ticket generado con exito')
    }
}

export default TicketController
