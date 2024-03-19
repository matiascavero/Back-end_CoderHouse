const { ProductManager } = require("./app")

const producto = new ProductManager();

// console.log(producto.addProduct('Manzana','La fruta mas comprada por los Argentinos','500','w123q','23'))
// console.log(producto.addProduct('Manzana','La fruta mas comprada por los Argentinos','500','w12a1','24'))
console.log(producto.getProducts())