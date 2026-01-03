import mysql from "mysql2/promise";

async function addMissingColumns() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "copems",
    });

    console.log("✅ Connected to database\n");
    console.log(
      "🔧 Adding missing draft_status and application_number columns...\n"
    );

    const tables = [
      "bp_construction",
      "project_details",
      "engineer_information",
    ];

    for (const table of tables) {
      try {
        // Add draft_status column
        await connection.query(`
          ALTER TABLE \`${table}\`
          ADD COLUMN IF NOT EXISTS \`draft_status\` ENUM('draft', 'submitted') DEFAULT 'draft' AFTER \`user_id\`,
          ADD INDEX IF NOT EXISTS \`idx_draft_status\` (\`draft_status\`)
        `);
        console.log(`  ✅ Added draft_status to ${table}`);

        // Add application_number column
        await connection.query(`
          ALTER TABLE \`${table}\`
          ADD COLUMN IF NOT EXISTS \`application_number\` VARCHAR(50) NULL AFTER \`draft_status\`,
          ADD INDEX IF NOT EXISTS \`idx_application_number\` (\`application_number\`)
        `);
        console.log(`  ✅ Added application_number to ${table}`);
      } catch (error) {
        if (error.code === "ER_DUP_FIELDNAME") {
          console.log(`  ℹ️  Columns already exist in ${table}`);
        } else {
          console.error(`  ❌ Error on ${table}:`, error.message);
        }
      }
    }

    // Also ensure engineer_information has foreign key
    try {
      await connection.query(`
        ALTER TABLE \`engineer_information\`
        ADD CONSTRAINT \`fk_engineer_information_user\`
        FOREIGN KEY (\`user_id\`) REFERENCES \`user_account\` (\`User_ID\`) ON DELETE CASCADE
      `);
      console.log(
        `\n  ✅ Added foreign key constraint to engineer_information`
      );
    } catch (error) {
      if (error.code === "ER_DUP_KEYNAME" || error.code === "ER_FK_DUP_NAME") {
        console.log(
          `\n  ℹ️  Foreign key already exists for engineer_information`
        );
      } else {
        console.error(`\n  ❌ Error adding FK:`, error.message);
      }
    }

    console.log("\n✅ All columns added successfully!");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addMissingColumns();
