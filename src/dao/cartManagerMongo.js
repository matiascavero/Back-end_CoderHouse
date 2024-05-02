
import { cartsModelo  } from './models/cartsModelo.js'


class CartsManagerMONGO {

  async getAll(){
    return await cartsModelo.find().lean();
   }

   async createCart(cart){
    return await cartsModelo.create(cart)
   }

}


export default CartsManagerMONGO