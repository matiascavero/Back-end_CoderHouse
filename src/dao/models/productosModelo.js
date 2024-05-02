import mongoose from 'mongoose'


const productosColletion= "productos"

const productosEsquema= new mongoose.Schema(
    {
        title: {type:String , required:true},
        description: {type:String},
        price: {type: Number, required:true},
        cod:{type: String, unique: true},
        stock: {type:Number, required:true},
        category:{type: String}
    },{
       timestamps: true
    }
)

export const productosModelo = mongoose.model(
    productosColletion,
    productosEsquema
)







