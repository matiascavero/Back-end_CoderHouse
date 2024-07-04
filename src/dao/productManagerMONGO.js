import { productosModelo } from "./models/productosModelo.js"
import { fakerES_MX as faker } from "@faker-js/faker";
class ProductManagerMONGO {
   
     async getAll(){
        return await productosModelo.find().lean()
        
     }
     async getById(id) {
      try {
          const product = await productosModelo.findById(id).lean();
          if (!product) {
              return { error: 'Producto no encontrado' };
          }
          return product;
      } catch (error) {
          return { error: 'Error al obtener el producto' };
      }
  }
  

     async createProd(producto){
      return await productosModelo.create(producto)
     }
     async deleteProd(id){
      return await productosModelo.deleteOne({_id:id})
  }

  async updateProd(id, updateData){
   try {
      const updatedProduct = await productosModelo.findByIdAndUpdate(id, updateData, {new: true})
      return updatedProduct
   } catch (error) {
      throw new Error('Error al actualizar el producto')
   }
  }
  async fakerProds(){
    const productosFaker = []
    try {
      for (let i = 0; i < 100; i++) {
       
      const productoFake = {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        code: faker.commerce.isbn(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.product()
      }
        
        productosFaker.push(productoFake)
      }
       
        return productosFaker
    } catch (error) {
        throw new Error('Error al generar los 100 productos con faker')
    }
  }
}


export default ProductManagerMONGO