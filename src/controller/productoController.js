import ProductManagerMONGO from "../dao/productManagerMONGO.js"
import Swal from 'sweetalert2'


const prod = new ProductManagerMONGO()
class ProductoController{
    
    static getAll=async(req, res) => {
        try {
            const producto = await prod.getAll()
            res.status(200).json(producto)
        } catch (error) {
            console.log(error)
            res.setHeader('Content-Type', 'application/json')
            return res.sta
        }
    
    }
    
    static getProdId =async(req, res) => {
        const { pid } = req.params;
        try {
            const producto = await prod.getById(pid);
            if (producto.error) {
                return res.status(404).json(producto);
            }
            return res.json(producto);
        } catch (error) {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({
                error: "Error inesperado en el servidor",
                detalle: `${error.message}`
            });
        }
    }

     
     static createProd= async(req, res) => {
        const producto = req.body;
        if (!producto.title || !producto.price || !producto.cod || !producto.stock) {
            return res.json(`Error todos los campos son obligatorios`)
        }
        try {
                await prod.createProd(producto)
                res.status(200).redirect('/productosadmin?productoagregado=true') 
        } catch (error) {
            res.status(500).json(`Error al agregar el producto: ${error.message}`)
        }
    }


     static deleteProd= async(req, res)=>{
        let {id}=req.params
       
    
        try {
            let resultado=await prod.deleteProd(id)
            if(resultado.deletedCount>0){
                res.setHeader('Content-Type','application/json');
                return res.status(200).redirect('/productosadmin')
            }else{
                res.setHeader('Content-Type','application/json');
                return res.status(404).json({error:`No existen usuario con id ${id} / o error al eliminar`})
            }
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
            
        }
    
    }

     static putProd = async(req, res) => {
        const productId = req.params.id;
        const updateData = req.body; // Suponiendo que los datos a actualizar están en el cuerpo de la solicitud
     
        try {
           const updatedProduct = await prod.updateProd(productId, updateData); // Llama a tu función para actualizar el producto
           res.json(updatedProduct);
        } catch (error) {
           console.error(error);
           res.status(500).json({ error: 'Error al actualizar el producto' });
        }
     }

     static faker = async(req,res)=>{
        try {
            const fakerproducts = await prod.fakerProds()
            res.status(200).json(fakerproducts)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al generar los productos fakerController' });
        }
     }
}


export default ProductoController