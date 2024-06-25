const isAdmin = (req, res, next)=>{
    if( req.user.rol === 'admin'){
        next()
    }
    else{
        res.status(403).send('no tienes el permiso necesario')
    }
}

export default isAdmin