import mongoose from "mongoose";

const usuarioModelo = mongoose.model('usuarios', new mongoose.Schema({
    nombre: String,
    email:{
        type: String, unique:true, required:true 
    },
    password:{
        type: String, required:true
    },
    rol:{
        type:String, default: 'user'
    }
}))


export default usuarioModelo