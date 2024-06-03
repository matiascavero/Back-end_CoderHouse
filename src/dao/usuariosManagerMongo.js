import usuarioModelo from './models/usuarioModelo.js'

class UsuariosManagerMongo{
  
  async getAll(){
    return await usuarioModelo.find().lean()
  }
async create(usuario){
    let nuevoUsuario = await usuarioModelo.create(usuario)
    return nuevoUsuario.toJSON()
}
async getBy(filtro={}){
  return await usuarioModelo.findOne(filtro).lean()
}
async delete(id){
 let usuario = await usuarioModelo.deleteOne({ _id: id }) 
 return `Usuario ${usuario} eliminado`
}
}


export default UsuariosManagerMongo;