const isUser = (req, res, next)=>{
    if(req.user && req.user.rol === 'user'){
        next()
    }
    else{
        res.status(403).redirect('/login')
    }
}


export default isUser