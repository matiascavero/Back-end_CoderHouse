import { cartsModelo } from '../dao/models/cartsModelo.js';

class CartsManagerMONGO {
    async getAll() {
        return await cartsModelo.find().lean();
    }

    async createCart(cart) {
        return await cartsModelo.create(cart);
    }

    async createOrUpdateCart(cart) {
        if (cart._id) {
            // Actualiza el carrito existente
            const existingCart = await cartsModelo.findById(cart._id);
            if (existingCart) {
                existingCart.products = cart.products;
                existingCart.total = existingCart.products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
                return await existingCart.save();
            }
        } else {
            // Crea un nuevo carrito
            cart.total = cart.products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
            return await this.createCart(cart);
        }
    }
    async deleteCart(id){
       await cartsModelo.deleteOne({_id:id})
      
    }
}

export default CartsManagerMONGO;
