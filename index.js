import express from "express"; // Import the Express library
import dotenv from "dotenv"; // Import the dotenv library to manage environment variables
import productsRoutes from "./routes/products.routes.js"; // Import the product routes from the specified path

dotenv.config(); // Load environment variables from the .env file

const app = express(); // Create an instance of the Express application

app.use(express.json()); // Middleware to parse incoming JSON requests

// Use the imported product routes for handling requests to product-related endpoints
app.use(productsRoutes);

// Start the server and listen on the specified port from the environment variables
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`); // Log a message indicating the server is running
});
