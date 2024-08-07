import express from 'express';
import TicketController from '../controller/ticketController.js';

const routerTicket = express.Router()

// //get
// routerTicket.get('/',TicketController.ticketGet)
//Post
routerTicket.post('/', TicketController.ticketPost)


export default routerTicket