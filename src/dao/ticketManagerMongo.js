import { ticketModelo } from "./models/ticketModelo.js";


class TicketManagerMongo{

    async getTick(filtro={}){
      return  ticketModelo.find(filtro).lean()
  
    }
    
    create(ticket){
      ticketModelo.create(ticket)
   } 
}

export default TicketManagerMongo