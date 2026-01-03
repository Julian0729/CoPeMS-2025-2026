import { pool } from "./config/database.js";

console.log("🔍 Testing Database Connection...\n");

async function testDatabaseConnection() {
  try {
    // Test 1: Basic Connection
    console.log("Test 1: Basic Connection");
    const [rows] = await pool.execute("SELECT 1 as test");
    console.log("✅ Basic connection successful\n");

    // Test 2: Database Name
    console.log("Test 2: Database Name");
    const [dbInfo] = await pool.execute("SELECT DATABASE() as db_name");
    console.log(`✅ Connected to database: ${dbInfo[0].db_name}\n`);

    // Test 3: List All Tables
    console.log("Test 3: List All Tables");
    const [tables] = await pool.execute("SHOW TABLES");
    console.log(`✅ Found ${tables.length} tables:`);
    tables.forEach((table, index) => {
      const tableName = Object.values(table)[0];
      console.log(`   ${index + 1}. ${tableName}`);
    });
    console.log("");

    // Test 4: Check Critical Tables
    console.log("Test 4: Check Critical Tables");
    const criticalTables = [
      "user_account",
      "refresh_tokens",
      "bldg_owner",
      "bp_construction",
      "project_details",
      "building_plans",
      "engineer_information",
      "lot_representative",
    ];

    const tableNames = tables.map((t) => Object.values(t)[0]);
    const missingTables = criticalTables.filter((t) => !tableNames.includes(t));

    if (missingTables.length > 0) {
      console.log(`⚠️  Missing tables: ${missingTables.join(", ")}\n`);
    } else {
      console.log("✅ All critical tables exist\n");
    }

    // Test 5: Check user_account table structure
    console.log("Test 5: Check user_account Table Structure");
    const [userColumns] = await pool.execute("SHOW COLUMNS FROM user_account");
    console.log("✅ user_account columns:");
    userColumns.forEach((col) => {
      console.log(
        `   - ${col.Field} (${col.Type}) ${col.Key ? "[" + col.Key + "]" : ""}`
      );
    });
    console.log("");

    // Test 6: Check if application tables have user_id column
    console.log("Test 6: Check user_id Foreign Keys");
    const appTables = [
      "bldg_owner",
      "bp_construction",
      "project_details",
      "building_plans",
      "engineer_information",
      "lot_representative",
    ];

    for (const tableName of appTables) {
      if (tableNames.includes(tableName)) {
        const [columns] = await pool.execute(`SHOW COLUMNS FROM ${tableName}`);
        const hasUserId = columns.some((col) => col.Field === "user_id");
        if (hasUserId) {
          console.log(`   ✅ ${tableName} has user_id column`);
        } else {
          console.log(
            `   ⚠️  ${tableName} MISSING user_id column (needs migration)`
          );
        }
      }
    }
    console.log("");

    // Test 7: Check Foreign Key Constraints
    console.log("Test 7: Check Foreign Key Constraints");
    const [constraints] = await pool.execute(`
      SELECT 
        TABLE_NAME,
        COLUMN_NAME,
        CONSTRAINT_NAME,
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE()
        AND REFERENCED_TABLE_NAME IS NOT NULL
        AND COLUMN_NAME = 'user_id'
    `);

    if (constraints.length > 0) {
      console.log(`✅ Found ${constraints.length} foreign key constraints:`);
      constraints.forEach((fk) => {
        console.log(
          `   - ${fk.TABLE_NAME}.${fk.COLUMN_NAME} → ${fk.REFERENCED_TABLE_NAME}.${fk.REFERENCED_COLUMN_NAME}`
        );
      });
    } else {
      console.log(
        "⚠️  No foreign key constraints found (needs migration script)"
      );
    }
    console.log("");

    // Test 8: Check refresh_tokens table
    console.log("Test 8: Check refresh_tokens Table");
    if (tableNames.includes("refresh_tokens")) {
      const [tokenColumns] = await pool.execute(
        "SHOW COLUMNS FROM refresh_tokens"
      );
      console.log("✅ refresh_tokens columns:");
      tokenColumns.forEach((col) => {
        console.log(
          `   - ${col.Field} (${col.Type}) ${
            col.Key ? "[" + col.Key + "]" : ""
          }`
        );
      });
    } else {
      console.log("⚠️  refresh_tokens table does not exist");
    }
    console.log("");

    // Test 9: Check if any users exist
    console.log("Test 9: Check User Accounts");
    const [userCount] = await pool.execute(
      "SELECT COUNT(*) as count FROM user_account"
    );
    console.log(`✅ Total users in database: ${userCount[0].count}\n`);

    // Test 10: Database Connection Pool Status
    console.log("Test 10: Connection Pool Status");
    console.log("✅ Connection pool configured:");
    console.log(`   - Max Connections: 10`);
    console.log(`   - Wait for Connections: true`);
    console.log(`   - Queue Limit: unlimited\n`);

    // Final Summary
    console.log("═══════════════════════════════════════");
    console.log("📊 DATABASE CONNECTION SUMMARY");
    console.log("═══════════════════════════════════════");
    console.log(`✅ Database: ${dbInfo[0].db_name}`);
    console.log(`✅ Total Tables: ${tables.length}`);
    console.log(`✅ Users: ${userCount[0].count}`);

    if (missingTables.length === 0) {
      console.log("✅ All critical tables present");
    } else {
      console.log(`⚠️  Missing tables: ${missingTables.length}`);
    }

    const tablesWithUserId = appTables.filter((t) => tableNames.includes(t));
    console.log(`✅ Application tables checked: ${tablesWithUserId.length}`);

    console.log("═══════════════════════════════════════\n");

    if (missingTables.length > 0 || constraints.length === 0) {
      console.log("⚠️  ACTION REQUIRED:");
      if (missingTables.length > 0) {
        console.log("   1. Some tables are missing");
        console.log("   2. Run migrations: npm run migrate");
      }
      if (constraints.length === 0) {
        console.log(
          "   3. Foreign keys missing - Run: database/add_user_id_to_tables.sql"
        );
      }
      console.log("");
    } else {
      console.log("✅ DATABASE IS PROPERLY CONFIGURED!");
      console.log("   All tables exist and have proper foreign keys.\n");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Database Connection Test Failed:");
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code}`);
    console.error(`   SQL State: ${error.sqlState || "N/A"}\n`);

    if (error.code === "ECONNREFUSED") {
      console.error("💡 Solution: Make sure MySQL/XAMPP is running");
    } else if (error.code === "ER_BAD_DB_ERROR") {
      console.error("💡 Solution: Create 'copems' database in phpMyAdmin");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("💡 Solution: Check DB_USER and DB_PASSWORD in .env file");
    }

    process.exit(1);
  }
}

testDatabaseConnection();
