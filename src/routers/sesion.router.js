import { Router } from "express";
import passport from "passport";
import SessionController from "../controller/sessionController.js";
const routeSesionRouter = Router()



routeSesionRouter.get("/error", SessionController.methodError)

routeSesionRouter.post('/registro',passport.authenticate("registro", {failureRedirect:"/api/sessions/error"}) ,SessionController.methodRegistro)

routeSesionRouter.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/error' }), SessionController.methodLogin);

routeSesionRouter.post('/delete', passport.authenticate('delete', { failureRedirect: '/api/sessions/error' }), SessionController.methodDelete);

routeSesionRouter.get('/logout',  SessionController.methodLogout);

routeSesionRouter.get('/github',passport.authenticate('github', {}), SessionController.methodGithub)

routeSesionRouter.get('/callbackGithub',passport.authenticate('github', { failureRedirect: '/api/sessions/error' }), SessionController.methodCallbackGit)

export default routeSesionRouter