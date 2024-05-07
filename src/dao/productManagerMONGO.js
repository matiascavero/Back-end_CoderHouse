import { productosModelo } from "./models/productosModelo.js"

class ProductManagerMONGO {
   
     async getAll(){
        return await productosModelo.find().lean()
        
     }

     async createProd(producto){
      return await productosModelo.create(producto)
     }
     async deleteProd(id){
      return await productosModelo.deleteOne({_id:id})
  }
}


export default ProductManagerMONGO