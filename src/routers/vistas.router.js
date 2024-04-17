import {Router } from 'express'
const routerVistas = Router()


routerVistas.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('home');
})


export default routerVistas