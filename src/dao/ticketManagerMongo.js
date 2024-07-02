import { ticketModelo } from "./models/ticketModelo.js";


class TicketManagerMongo{
    create(ticket){
      ticketModelo.create(ticket)
   } 
}

export default TicketManagerMongo