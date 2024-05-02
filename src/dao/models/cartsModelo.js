import mongoose from "mongoose";


const cartsCollection = 'carts';

const cartsEsquema = new mongoose.Schema(
    {
      products: [
        {id: {type: Number, require:true} , quantity: { type: Number, default: 1 }}
      ]
    },
    {
        timestamps:true
    }
)


export const cartsModelo = mongoose.model(
    cartsCollection,
    cartsEsquema
)