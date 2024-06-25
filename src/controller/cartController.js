import {cartsModelo} from '../dao/models/cartsModelo.js'

const CartController = {
    async getAll(req, res) {
      try {
        const carts = await cartsModelo.find();
        res.json(carts);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    async metPost(req, res) {
      const { productId } = req.body;
  
      try {
        let cart = await cartsModelo.findOne(); // Suponiendo que solo hay un carrito por ahora
  
        if (!cart) {
          cart = new cartsModelo();
        }
  
        const productIndex = cart.products.findIndex(p => p.id === productId);
  
        if (productIndex !== -1) {
          cart.products[productIndex].quantity += 1;
        } else {
          cart.products.push({ id: productId, quantity: 1 });
        }
  
        await cart.save();
        res.json({ message: 'Producto agregado al carrito' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };
  
  export default CartController;