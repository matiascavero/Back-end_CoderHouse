import mongoose from "mongoose";


const cartsCollection = 'carts';

const productSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number }
});

const cartsEsquema = new mongoose.Schema(
  {
      products: [productSchema],
      total: { type: Number, default: 0 },
      email: {type:String}
  },
  {
      timestamps: true
  }
);

export const cartsModelo = mongoose.model(cartsCollection, cartsEsquema);