import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "copems",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Get promise-based connection
const promisePool = pool.promise();

// Test database connection
async function testConnection() {
  try {
    const [rows] = await promisePool.execute("SELECT 1 as test");
    console.log("✅ Database connected successfully");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
}

export { promisePool as pool, testConnection };
