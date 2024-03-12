const { ProductManager } = require("./app");

const producto = new ProductManager();

console.log(producto.addProduct('Manzana','La fruta mas comprada por los Argentinos','500','w123q','23', 'src/aa/img1'))
console.log(producto.addProduct('Salchichas','todo grasa','500','a234s','8', 'src/aa/img2'))
console.log(producto.getProducts())