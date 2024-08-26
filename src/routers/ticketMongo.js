import express from 'express';
import TicketController from '../controller/ticketController.js';

const routerTicket = express.Router()


routerTicket.post('/', TicketController.ticketPost)


export default routerTicket