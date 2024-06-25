import mongoose from "mongoose";

const ticketCollection = "tickets";


const ticketEsquema = new mongoose.Schema(
    {
        code:{type:String},
        purcharse_datatime:{type:String},
        amount:{ type: String, require: true},
        purchaser:{ type: String, require:true}
     
    },
    {
        timestamps:true
    }
)


export const ticketModelo = mongoose.model(
    ticketCollection,
    ticketEsquema
)
