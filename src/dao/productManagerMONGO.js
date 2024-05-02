import { productosModelo } from "./models/productosModelo.js"

class ProductManagerMONGO {
   
     async getAll(){
        return await productosModelo.find().lean()
        
     }

     async createProd(producto){
      return await productosModelo.create(producto)
     }
     
}


export default ProductManagerMONGO