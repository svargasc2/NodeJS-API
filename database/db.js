import { createPool } from "mysql2/promise"; // Import the createPool function from the mysql2 library for creating a connection pool
import dotenv from "dotenv"; // Import the dotenv library to manage environment variables

dotenv.config(); // Load environment variables from the .env file

// Create a connection pool to the MySQL database using configuration from environment variables
export const pool = createPool({
  host: process.env.HOST, // Database host (e.g., localhost)
  database: process.env.DATABASE, // Database name
  user: process.env.USER, // Database username
  password: process.env.PASSWORD, // Database password
  port: process.env.DB_PORT, // Database port (default is usually 3306)
  multipleStatements: true, // Allow multiple SQL statements in a single query
  ssl: {
    // SSL configuration for secure connections
    rejectUnauthorized: false, // Do not reject unauthorized certificates
  },
});

// Test the database connection
pool
  .getConnection() // Attempt to get a connection from the pool
  .then(() => {
    console.log(`Database connected`); // Log success message if connection is established
  })
  .catch((err) => {
    console.log(`Error connecting to database`, err); // Log error message if connection fails
  });
