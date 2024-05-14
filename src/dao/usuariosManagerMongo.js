import usuarioModelo from './models/usuarioModelo.js'

class UsuariosManagerMongo{
  
async create(usuario){
    let nuevoUsuario = await usuarioModelo.create(usuario)
    return nuevoUsuario.toJSON()
}
async getBy(filtro={}){
  return await usuarioModelo.findOne(filtro).lean
}
}


export default UsuariosManagerMongo;