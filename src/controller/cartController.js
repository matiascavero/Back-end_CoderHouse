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
  
    static metPost= async(req, res) =>{
        const { productId } = req.params;
        const {email} = req.user
        
        try {
            const prod = await producto.getById(productId);
            let carts = await cartsManager.getAll();
            let cart = carts[0];
  
            if (!cart) {
              cart = { products: [], email };
            } else if (!Array.isArray(cart.products)) {
              cart.products = [];
            }
  
            const productIndex = cart.products.findIndex(p => p.id.equals(productId));
            let price = prod.price;
  
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
                cart.products[productIndex].price = price;
            } else {
                cart.products.push({ id: productId, quantity: 1, price});
            }
  
            await cartsManager.createOrUpdateCart(cart);
            res.redirect('/productos');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
  };
  
  export default CartController;
  