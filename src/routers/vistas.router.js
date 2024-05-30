import { Router } from 'express'
import auth from '../middleware/auth.js'

const routerVistas = Router()



routerVistas.get('/', (req, res)=>{
    res.status(200).render('home')
})

routerVistas.get('/registro', (req, res)=>{
    res.status(200).render('registro')
})

routerVistas.get('/login', (req, res)=>{
    res.status(200).render('login')
})

routerVistas.get('/perfil', auth, (req, res)=>{
    const usuario =  req.session.usuario
    res.status(200).render('perfil', {usuario})
    
})




export default routerVistas