import mongoose from "mongoose";

const usuarioModelo = mongoose.model('usuarios', new mongoose.Schema({
    first_name: String,
    last_name: String,
    email:{
        type: String, unique:true, required:true 
    },
    age: Number,
    password:{
        type: String, required:true
    },
    rol:{
        type:String, default: 'user'
    }
}))


export default usuarioModelo