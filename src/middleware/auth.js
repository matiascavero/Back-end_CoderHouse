const auth = (req, res, next)=>{
    if(!req.session.usuario){
        console.log('Auth middleware executed');
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:"No existen usuasios autenticados"})
    }
    next();
}

export default auth;