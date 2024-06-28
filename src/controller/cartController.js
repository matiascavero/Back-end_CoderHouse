import CartsManagerMONGO from "../dao/cartManagerMongo.js";

const cartsManager = new CartsManagerMONGO();

const CartController = {
    async getAll(req, res) {
        try {
            const carts = await cartsManager.getAll();
            res.json(carts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async metPost(req, res) {
        const { productId } = req.body;

        try {
            let carts = await cartsManager.getAll(); // Obtener todos los carritos
            let cart = carts[0]; // Suponiendo que solo hay un carrito por ahora

            if (!cart) {
                cart = { products: [] };
            }

            const productIndex = cart.products.findIndex(p => p.id === productId);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ id: productId, quantity: 1 });
            }

            await cartsManager.createOrUpdateCart(cart); // Guardar el carrito actualizado
            res.json({ message: 'Producto agregado al carrito' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default CartController;
