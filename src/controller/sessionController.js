import UsuariosManagerMongo from "../dao/usuariosManagerMongo.js";
import { cartsModelo } from "../dao/models/cartsModelo.js";
const usuariosManager = new UsuariosManagerMongo()


class SessionController{
    //get error
    static methodError = (req, res)=>{
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`Fallo al autenticar...!!!`
            }
        )
        
    }
    static getUsuarios = async (req, res)=>{
        try {
         const usuarios = await usuariosManager.getAll()
         res.status(200).json({usuarios})
        } catch (error) {
         console.error(masage.error)
         return res.status(500).json({
            error: 'Error inesperado en el servidor - Intente más tarde, o contacte a su administrador',
         
        });
        }
     }
    //post registro
    static methodRegistro = async (req, res) => {
        try {
            
            const nuevoUsuario = req.user;

           
            const nuevoCarrito = new cartsModelo({
                email: nuevoUsuario.email, 
                products: [], 
                total: 0
            });

            await nuevoCarrito.save();

            res.status(201).json({ mensaje: "Registro OK", nuevoUsuario });
        } catch (error) {
           
            res.status(500).json({ error: "Error inesperado en el servidor" });
        }
    }
    //post login
    static methodLogin = async (req, res) => {
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
       
        
    }
    //post delete
    static methodDelete = async (req, res) => {
        const { usuario } = req.user;
        
        try {
         req.session.destroy(e => {
             if (e) {
                 console.log(`Error al destruir la sesión de ${usuarioConst}`);
                 res.setHeader('Content-Type', 'application/json');
                 return res.status(500).json({
                     error: 'Error inesperado en el servidor - Intente más tarde, o contacte a su administrador',
                     detalle: `${e.message}`
                 });
             }
         });
         res.setHeader('Content-Type', 'application/json');
         return res.redirect('/registro?mensaje=Cuenta%20eliminada%20exitosamente');
        } catch (error) {
         res.setHeader('Content-Type', 'application/json');
         return res.json({ payload: `error al borrar la cuenta ${usuarioConst}...!!!` });
        }
     }
    //post logout
    static methodLogout = (req, res) => {
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
     }
    //get GitHub
    static methodGithub = (req,res)=>{

    }
    //get callbackgit
    static methodCallbackGit =(req,res)=>{
        req.session.usuario=req.user
    
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:req.user});
    }
    
}

export default SessionController