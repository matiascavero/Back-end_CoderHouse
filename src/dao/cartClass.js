import fs from 'fs';
import ProductManager from './productClass.js';


class CartsManager {
    //propiedades
    #carts;
    static idProducts = 0;
    #path;
    constructor() {
        this.#path = './src/data/carritos.json';
        this.#carts = this.#leerCartsInFile()
    }
    #leerCartsInFile() {
        try {
            if (fs.existsSync(this.#path)) {
                const fileContent = fs.readFileSync(this.#path, 'utf-8');
                if (fileContent.trim() !== '') {
                    return JSON.parse(fileContent);
                }
            }
            return [];
        } catch (error) {
            console.log(`ocurrió un error al leer el archivo: ${error}`);
            return [];
        }
    }

    getCarts() {
        return this.#carts;
    }
    #asignarIdCart() {
        let id = 1;
        if (this.#carts.length !== 0) {
            id = this.#carts[this.#carts.length - 1].id + 1;
        }
        return id;
    }
    #guardarArchivo() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#carts))
        } catch (error) {
            console.log(`ocurrio un error al guardar el archivo ${error}`)
        }
    }
    createCart() {
        const newCart = {
            id: this.#asignarIdCart(),
            products: []
        }
        this.#carts.push(newCart)
        this.#guardarArchivo()
        return newCart
    }

    getCartId(id) {
        const valor = this.#carts.find(p => p.id === id);
        if (valor) {
            return valor;
        } else {
            return `No encontrado, ID no reconocido: ${id}`;
        }
    }

    addProductInCart(cid, pid) {
        let respuesta = `El carrito con el id ${cid} no existe`
        const indexCarrito = this.#carts.findIndex(c => c.id === cid)
        if (indexCarrito !== -1) {
            const indexProducto = this.#carts[indexCarrito].products.findIndex(p => p.id === pid)
            const product = new ProductManager();
            const p = product.getProductsId(pid)

            if (p.status && indexProducto === -1) {
                this.#carts[indexCarrito].products.push({ id: pid, 'quantity': 1 })
                this.#guardarArchivo()
                respuesta = `Producto agregado correctamente`
            } else if (p.status && indexCarrito !== -1) {
                ++this.#carts[indexCarrito].products[indexProducto].quantity
                this.#guardarArchivo()
                respuesta = `Producto agregado correctamente`
            }
            else {
                respuesta`El producto con el id ${pid} no existe`
            }
        }
        return respuesta
    }


}


export default CartsManager