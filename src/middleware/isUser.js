const isUser = (req, res, next)=>{
    if(req.user && req.user.rol === 'user'){
        next()
    }
    else{
        res.status(403).send('no tienes el rol de user')
    }
}


export default isUser