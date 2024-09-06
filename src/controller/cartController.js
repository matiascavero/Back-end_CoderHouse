import CartsManagerMONGO from "../dao/cartManagerMongo.js";
import ProductManagerMONGO from '../dao/productManagerMONGO.js'
const cartsManager = new CartsManagerMONGO();
const producto = new ProductManagerMONGO()
class CartController {

    static getAll = async(req, res) => {
        try {
            const carts = await cartsManager.getAll();
            res.json(carts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
  
    static metPost = async (req, res) => {
        const { cid, pid } = req.params; // cid: email del usuario, pid: ID del producto
        try {
            // Buscar el producto por ID
            const producto = await productModelo.findById(pid);
            if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

            // Buscar el carrito por email (o identificador del usuario)
            let cart = await cartsModelo.findOne({ email: cid });
            if (!cart) {
                // Si el carrito no existe, crearlo
                cart = new cartsModelo({ email: cid, products: [], total: 0 });
            }

            // Buscar el producto en el carrito
            const productIndex = cart.products.findIndex(p => p.id.equals(pid));
            if (productIndex !== -1) {
                // Si el producto ya está en el carrito, aumentar la cantidad
                cart.products[productIndex].quantity += 1;
                cart.products[productIndex].price = producto.price;
            } else {
                // Si el producto no está en el carrito, añadirlo
                cart.products.push({ id: pid, quantity: 1, price: producto.price });
            }

            // Recalcular el total del carrito
            cart.total = cart.products.reduce((total, p) => total + (p.price * p.quantity), 0);

            // Guardar el carrito actualizado en la base de datos
            await cart.save();
            res.status(200).json({ mensaje: 'Producto añadido al carrito', cart });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static getCartById = async (req, res) => {
        const { cid } = req.params; 
        try {
           
            const cart = await cartsModelo.findOne({ email: cid });
            if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static purchaseCart = async (req, res) => {
        const { cid } = req.params; 
        try {
          
            const cart = await cartsModelo.findOne({ email: cid });
            if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

           

            cart.products = [];
            cart.total = 0;
            await cart.save();

            res.status(200).json({ mensaje: 'Compra realizada con éxito', cart });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
  };
  
  export default CartController;
  