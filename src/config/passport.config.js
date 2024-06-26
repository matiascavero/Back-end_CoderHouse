import passport from "passport";
import local from 'passport-local'
import github from 'passport-github2'
import { generaHash, validaPasword } from "../utils/utils.js";
import UsuariosManagerMongo from "../dao/usuariosManagerMongo.js";

const usuariosManager = new UsuariosManagerMongo


export const initPassport = () => {

    //REGISTRO
    passport.use(
        "registro",
        new local.Strategy(
            {
                usernameField: "email",
                passReqToCallback: true
            },
            async (req, username, password, done) => {
                try {
                    let { first_name,last_name,age, rol } = req.body
                    if (!first_name, !last_name) {
                        return done(null, false)
                    }
                     
                    if(!rol === 'admin' || !rol === 'user'){
                        return(done,false)
                    }
                    let existe = await usuariosManager.getBy({ email: username })
                    if (existe) {
                        return done(null, false)
                    }
                    password = generaHash(password)
                     
                    let nuevoUsuario = await usuariosManager.create({ first_name,last_name, age, email: username, password, rol })
                   
                    return done(null, nuevoUsuario)


                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    //LOGIN

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField: "email"

            },
            async (username, password, done) => {
              
                try {
                    const usuarioLogin = await usuariosManager.getBy({ email: username });
                    if (!usuarioLogin) {
                        return done(null, false, { message: 'Credenciales inválidas' });
                    }

                    if (!validaPasword(password, usuarioLogin.password)) {
                        return done(null, false, { message: 'Credenciales inválidas' });
                    }
                 

                   

                    return done(null, usuarioLogin);
                } catch (error) {
                    return done(error);
                }

            }
        )
    )

    //delete
    passport.use(
        "delete",
        new local.Strategy(
            {
                usernameField: "email"

            },
            async (username, password, done) => {
              
                try {
                    const usuarioContraseña = await usuariosManager.getBy({email: username})
                    
                    if (!usuarioContraseña) {
                        return done(null, false, { message: 'Credenciales inválidas' });
                    }
                          
                    if (!validaPasword(password, usuarioContraseña.password)) {
                        return done(null, false, { message: 'Credenciales inválidas' });
                    }
                     await usuariosManager.delete({email: username})
                    
                   

                    return done(null, usuarioContraseña);
                } catch (error) {
                    return done(error);
                }

            }
        )
    )
   
    
    passport.use(
        "github",
        new github.Strategy(
            {
               clientID:"Iv23li3jR86aLmun1wRY",
               clientSecret:"37845dcaecac6cd12c444fb461d3caa13ec046a9",
               callbackURL:"http://localhost:3000/api/sessions/callbackGithub"
            },
            async(tokenAcceso, tokenRefresh, profile, done)=>{
                try {
                    let email=profile._json.email
                    let nombre=profile._json.name
                    if(!nombre || !email){
                        return done(null, false)
                    }
                    let usuario=await usuariosManager.getBy({email})
                    if(!usuario){
                        usuario=await usuariosManager.create({
                            nombre, email, profile
                        })
                    }

                    return done(null, usuario)
                } catch (error) {
                    done(error)
                }
            }
        )
    )


    passport.serializeUser((usuario, done) => {
        return done(null, usuario._id)
    })

    passport.deserializeUser(async (id, done) => {
        let usuario = await usuariosManager.getBy({ _id: id })
        return done(null, usuario)
    })

}