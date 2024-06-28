import { cartsModelo } from '../dao/models/cartsModelo.js';

class CartsManagerMONGO {
    async getAll() {
        return await cartsModelo.find().lean();
    }

    async createCart(cart) {
        return await cartsModelo.create(cart);
    }

    async createOrUpdateCart(cart) {
        // Suponiendo que siempre estamos actualizando el primer carrito
        if (cart._id) {
            return await cartsModelo.findByIdAndUpdate(cart._id, cart, { new: true });
        } else {
            return await this.createCart(cart);
        }
    }
}

export default CartsManagerMONGO;
