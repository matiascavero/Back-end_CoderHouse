import { Router } from "express";
import { generaHash, validaPasword } from '../utils/utils.js'
import UsuariosManagerMongo from '../dao/usuariosManagerMongo.js'
import passport from "passport";

const routeSesionRouter = Router()

const usuariosManager = new UsuariosManagerMongo()

routeSesionRouter.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(500).json(
        {
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle:`Fallo al autenticar...!!!`
        }
    )
    
})
routeSesionRouter.post('/registro',passport.authenticate("registro", {failureRedirect:"/api/sessions/error"}) ,async (req,res)=>{

    // let {nombre, email, password}=req.body
    // if(!nombre || !email || !password){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(400).json({error:`Complete nombre, email, y password`})
    // }

    // let existe=await usuariosManager.getBy({email})
    // if(existe){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(400).json({error:`Ya existe ${email}`})
    // }
    // password=generaHash(password)
    // try {
    //     let nuevoUsuario=await usuariosManager.create({nombre, email, password, rol:"user"})
    //     res.setHeader('Content-Type','application/json')
    //     res.status(200).json({
    //         message:"Registro correcto...!!!", nuevoUsuario
    //     })
    // } catch (error) {
    //     console.log(error);
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(500).json(
    //         {
    //             error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
    //             detalle:`${error.message}`
    //         }
    //     )
    // }
  
     res.setHeader('Content-Type', 'application/json');
     return res.status(201).json({mensaje:"Registro OK", nuevoUsuario: req.user})
     

})



routeSesionRouter.post('/login', 
    passport.authenticate('login', { failureRedirect: '/api/sessions/error' }), 
    async (req, res) => {
        let { web } = req.body
        
        const usuario = { ...req.user };
        delete usuario.password;
        req.session.usuario = usuario;
        if(web){
            res.redirect("/perfil")
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:"Login correcto", usuario});
        }
        // res.setHeader('Content-Type', 'application/json');
        // return res.status(201).json({ mensaje: "Inicio de sesión OK" });
        
    }
//         let {email, password, web}=req.body

    
//     if(!email || !password){
//         if(web){
//             return res.redirect(`/login?error=Complete email, y password`)
//         }else{
//             res.setHeader('Content-Type','application/json');
//             return res.status(400).json({error:`Complete email, y password`})
//         }
//     }
//     let usuario=await usuariosManager.getBy({email})
   
    
//     if(!usuario){
//         if(web){
//             return res.redirect(`/login?error=Credenciales invalidas`)
//         }else{
//             res.setHeader('Content-Type','application/json');
//             return res.status(400).json({error:`Credenciales inválidas`})
//         }
//     }
//     if(validaPasword(password, usuario.password)){
//         if(web){
//             return res.redirect(`/login?error=Credenciales invalidas`)
//         }else{
//             res.setHeader('Content-Type','application/json');
//             return res.status(400).json({error:`Credenciales inválidas`})
//         }
//     }
//     usuario={...usuario}
//     delete usuario.password
//     req.session.usuario=usuario
    
    
);
routeSesionRouter.get('/logout',  (req, res) => {
   try {
    req.session.destroy(e => {
        if (e) {
            console.log(`Error al destruir la sesión de ${username}`);
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({
                error: 'Error inesperado en el servidor - Intente más tarde, o contacte a su administrador',
                detalle: `${e.message}`
            });
        }
    });
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: `Logout Exitoso de ${req.user}...!!!` });
   } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.json({ payload: `error en el logout de ${req.user}...!!!` });
   }
});


routeSesionRouter.get('/github',passport.authenticate('github', {}),(req,res)=>{

})
routeSesionRouter.get('/callbackGithub',passport.authenticate('github', { failureRedirect: '/api/sessions/error' }),(req,res)=>{
    req.session.usuario=req.user

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:req.user});
})

export default routeSesionRouter