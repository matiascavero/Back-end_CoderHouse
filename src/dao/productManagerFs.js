import fs from 'fs';
class ProductManagerMEMORY {
    //propiedades
    #products;
    static idProducts = 0;
    #path;
    constructor() {
        this.#path = './src/data/productos.json';
        this.#products = this.#leerProductosInFile()
    }
    #leerProductosInFile() {
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


    #asignarIdProducto() {
        let id = 1;
        if (this.#products.length !== 0) {
            id = this.#products[this.#products.length - 1].id + 1;
        }
        return id;
    }
    #guardarArchivo() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        } catch (error) {
            console.log(`ocurrio un error al guardar el archivo ${error}`)
        }
    }
    addProduct(title, description, price, code, stock, category) {
        if (!title || !description || !price || !stock || !code || !category) {
            return `Todos los campos son obligatorios (title, description, price, stock)`;
        }

        const productoRepetido = this.#products.some(p => p.code === code);

        if (productoRepetido) {
            return `ERROR: Código repetido`;
        }

        const id = this.#asignarIdProducto();
        const producto = {
            id: id,
            title: title,
            description: description,
            price: price,
            code: code,
            stock: stock,
            status: true,
            category: category
        };
        this.#products.push(producto);
        this.#guardarArchivo();
        return `Producto añadido con ID: ${id}`;
    }
    getProducts(limit = 0) {
        limit = Number(limit)
        if (limit > 0) {
            return this.#products.slice(0, limit)
        }
        else {
            return this.#products;
        }
    }

    async getProductsId(id) {
        let status = false
        let resp = `El producto con id ${id} no existe`

        const valor =  this.#products.find(p => p.id === id);
        if (valor) {
            status = true;
            resp = valor
        } 
        return {status, resp}
    }
    updateProduct(id, objetoUpdate) {
        let msg = ` prodcuto no existe ${id}`

        const index = this.#products.findIndex(p => p.id === id)

        if (index !== -1) {
            const { id, ...rest } = objetoUpdate;
            this.#products[index] = { ...this.#products[index], ...rest };
            this.#guardarArchivo()
        }
        return msg
    }
     async deleteProduct (id) {
      
        const index =  this.#products.findIndex(p => p.id === id)
        if (index !== -1) {
            this.#products = this.#products.filter(p => p.id !== id)
            this.#guardarArchivo();
            return  `producto eliminado`
        }
        throw new Error(`el producto con ${id} no existe`);
    }
}


export default ProductManagerMEMORY