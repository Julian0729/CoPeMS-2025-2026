import { pool } from "./config/database.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupRefreshTokens() {
  try {
    console.log("🔧 Setting up refresh tokens table...\n");

    // Create refresh_tokens table
    console.log("Creating refresh_tokens table...");
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id int(11) NOT NULL AUTO_INCREMENT,
        user_id int(11) NOT NULL,
        token varchar(500) NOT NULL,
        expires_at timestamp NOT NULL,
        revoked tinyint(1) NOT NULL DEFAULT 0,
        revoked_reason varchar(100) DEFAULT NULL,
        revoked_at timestamp NULL DEFAULT NULL,
        ip_address varchar(45) DEFAULT NULL,
        user_agent varchar(500) DEFAULT NULL,
        created_at timestamp NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id),
        UNIQUE KEY token (token),
        KEY user_id (user_id),
        KEY expires_at (expires_at),
        KEY user_id_revoked (user_id, revoked)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
    `);
    console.log("✅ refresh_tokens table created");

    // Add last_login column
    console.log("Adding last_login column to user_account...");
    try {
      await pool.execute(`
        ALTER TABLE user_account 
        ADD COLUMN last_login timestamp NULL DEFAULT NULL
      `);
      console.log("✅ last_login column added");
    } catch (error) {
      if (error.code === "ER_DUP_FIELDNAME") {
        console.log("ℹ️  last_login column already exists");
      } else {
        console.log("⚠️  Could not add last_login column:", error.message);
      }
    }

    console.log("\n✨ Setup complete! You can now login.\n");
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    console.error(error);
    process.exit(1);
  }
}

setupRefreshTokens();
