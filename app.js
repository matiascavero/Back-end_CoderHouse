class ProductManager {
    //propiedades
    #products;
    static idProducts = 0;

    constructor() {
        this.#products = [];
    }

    addProduct(title, description, price, code, stock, thumbnail) {
        if (!title || !description || !price || !stock || !code) {
            return `Todos los campos son obligatorios (title, description, price, stock)`;
        }

        const productoRepetido = this.#products.some(p => p.code === code);
        
        if (productoRepetido) {
            return `ERROR: Código repetido`;
        }

        const id = ++ProductManager.idProducts;
        const producto = {
            id: id,
            title: title,
            description: description,
            price: price,
            code: code,
            stock: stock,
            thumbnail: thumbnail
        };
        this.#products.push(producto);
    }

    getProducts() {
        return this.#products;
    }

    getProductsId(id) {
        const valor = this.#products.find(p => p.id === id);
        if (valor) {
            return valor;
        } else {
            return `No encontrado, ID no reconocido: ${id}`;
        }
    }
}

module.exports = {
    ProductManager: ProductManager
};
