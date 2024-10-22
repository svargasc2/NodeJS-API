import { Router } from "express"; // Import the Router from Express
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js"; // Import the product controller functions

const router = Router(); // Create a new router instance

// Route to get all products
router.get("/products", getAllProducts);

// Route to get a specific product by its ID
router.get("/products/:id", getProductById);

// Route to create a new product
router.post("/products", createProduct);

// Route to update an existing product by its ID
router.put("/products/:id", updateProduct);

// Route to delete a product by its ID
router.delete("/products/:id", deleteProduct);

// Export the router to be used in other parts of the application
export default router;
