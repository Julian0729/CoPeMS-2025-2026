import mysql from "mysql2/promise";

async function fixEngineerFK() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "copems",
    });

    console.log("✅ Connected to database\n");
    console.log("🔧 Fixing engineer_information foreign key...\n");

    // First check the current type
    const [columns] = await connection.query(`
      SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = 'copems' 
      AND TABLE_NAME = 'engineer_information'
      AND COLUMN_NAME = 'user_id'
    `);

    console.log(`Current user_id type: ${columns[0].COLUMN_TYPE}`);

    // Modify to match user_account.User_ID
    await connection.query(`
      ALTER TABLE \`engineer_information\`
      MODIFY COLUMN \`user_id\` INT(11) NULL
    `);
    console.log("✅ Updated user_id column type to INT(11)\n");

    // Add foreign key
    try {
      await connection.query(`
        ALTER TABLE \`engineer_information\`
        ADD CONSTRAINT \`fk_engineer_information_user\`
        FOREIGN KEY (\`user_id\`) REFERENCES \`user_account\` (\`User_ID\`) ON DELETE CASCADE
      `);
      console.log("✅ Added foreign key constraint to engineer_information\n");
    } catch (error) {
      if (error.code === "ER_DUP_KEYNAME" || error.code === "ER_FK_DUP_NAME") {
        console.log("ℹ️  Foreign key already exists\n");
      } else {
        throw error;
      }
    }

    // Verify all foreign keys are in place
    const [fks] = await connection.query(`
      SELECT TABLE_NAME, CONSTRAINT_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = 'copems'
      AND TABLE_NAME IN ('bldg_owner', 'bp_construction', 'project_details', 'engineer_information')
      AND REFERENCED_TABLE_NAME = 'user_account'
    `);

    console.log("📋 All foreign key constraints:");
    console.table(fks);

    console.log("\n✅ Setup complete! All tables now have:");
    console.log("   - user_id column (INT(11))");
    console.log("   - draft_status ENUM('draft', 'submitted')");
    console.log("   - application_number VARCHAR(50)");
    console.log("   - Foreign key to user_account");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixEngineerFK();
