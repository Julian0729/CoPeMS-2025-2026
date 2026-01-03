import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDraftSystem() {
  let connection;

  try {
    // Create connection
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "copems",
      multipleStatements: true,
    });

    console.log("✅ Connected to database");

    // Read SQL file
    const sqlFile = path.join(__dirname, "database", "add_draft_system.sql");
    const sql = fs.readFileSync(sqlFile, "utf8");

    // Execute SQL
    console.log("🔧 Adding draft system columns and procedures...");
    await connection.query(sql);

    console.log("✅ Draft system setup completed successfully!");
    console.log("\nThe following changes were made:");
    console.log(
      "1. Added user_id, draft_status, application_number columns to:"
    );
    console.log("   - bldg_owner");
    console.log("   - bp_construction");
    console.log("   - project_details");
    console.log("   - engineer_information");
    console.log("2. Created stored procedure: GetUserDraftData");
    console.log("3. Created stored procedure: FinalizeApplication");
  } catch (error) {
    console.error("❌ Error setting up draft system:", error.message);
    if (error.sql) {
      console.error("SQL:", error.sql);
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDraftSystem();
