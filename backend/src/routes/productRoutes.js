import { Router } from "express";
import isAuthorised from "../middleware/authMiddleware.js";
import { addNewProduct, updateProduct, deleteProduct, getAllProduct, getProductById } from "../controllers/productController.js";


const productRoutes = Router();

//  all get routes
productRoutes.get('/:id', isAuthorised, getProductById);
productRoutes.get('/', isAuthorised, getAllProduct);

//  all post routes 
productRoutes.post('/create', isAuthorised, addNewProduct);

//  all put/update routes 
productRoutes.patch('/update/:id', isAuthorised, updateProduct);

//  all delete routes 
productRoutes.delete('/delete/:id', isAuthorised, deleteProduct);



export default productRoutes;