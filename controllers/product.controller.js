import { pool } from "../database/db.js";

// Function to get all products from the database
export const getAllProducts = async (req, res) => {
  try {
    // Execute a SQL query to select all products
    const [result] = await pool.query("SELECT * FROM products");
    // Return the result as JSON
    res.json(result);
  } catch (error) {
    console.log(error);
    // Return an error message with a 500 status if an error occurs
    return res.status(500).json({ message: error.message });
  }
};

// Function to get a single product by its ID
export const getProductById = async (req, res) => {
  try {
    // Execute a SQL query to select a product by its ID
    const [result] = await pool.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    // Check if the product was found
    if (result.length === 0)
      return res.status(404).json({ message: "Product is not found" });

    // Return the found product as JSON
    res.json(result[0]);
  } catch (error) {
    console.log(error);
    // Return an error message with a 500 status if an error occurs
    return res.status(500).json({ message: error.message });
  }
};

// Function to create a new product in the database
export const createProduct = async (req, res) => {
  try {
    // Destructure the product information from the request body
    const { name, description, quantity, price } = req.body;

    // Execute a SQL query to insert a new product into the database
    const [result] = await pool.query(
      "INSERT INTO products(name, description, quantity, price) VALUES (?, ?, ?, ?)",
      [name, description, quantity, price]
    );
    // Return the result of the insertion as JSON
    res.json({ result });
  } catch (error) {
    console.log(error);
    // Return an error message with a 500 status if an error occurs
    return res.status(500).json({ message: error.message });
  }
};

// Function to update an existing product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get the product ID from the request parameters
    const { name, description, quantity, price } = req.body; // Get updated fields from the request body

    // Check if the product exists
    const [product] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    if (product.length === 0)
      return res.status(404).json({ message: "Product not found" });

    // Prepare arrays to hold the updates and values
    const updates = [];
    const values = [];

    // Only add fields that were provided in the request body
    if (name) {
      updates.push(`name = ?`);
      values.push(name);
    }
    if (description) {
      updates.push(`description = ?`);
      values.push(description);
    }
    if (quantity) {
      updates.push(`quantity = ?`);
      values.push(quantity);
    }
    if (price) {
      updates.push(`price = ?`);
      values.push(price);
    }

    // If no fields are provided to update, return an error
    if (updates.length === 0)
      return res.status(400).json({ message: "No fields to update" });

    // Execute the update SQL query
    await pool.query(`UPDATE products SET ${updates.join(", ")} WHERE id = ?`, [
      ...values,
      id,
    ]);
    // Return a success message
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    // Return an error message with a 500 status if an error occurs
    return res.status(500).json({ message: error.message });
  }
};

// Function to delete a product from the database
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get the product ID from the request parameters
    // Check if the product exists
    const [product] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (product.length === 0)
      return res.status(404).json({ message: "Product is not found" });

    // Execute the delete SQL query
    await pool.query("DELETE FROM products WHERE id = ?", [id]);

    // Return a success message
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    // Return an error message with a 500 status if an error occurs
    return res.status(500).json({ message: error.message });
  }
};
