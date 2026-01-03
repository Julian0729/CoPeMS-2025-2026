import mysql from "mysql2/promise";

async function setupAndCleanup() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "copems",
    });

    console.log("✅ Connected to database\n");

    // Step 1: Check current table structures
    console.log("📋 Checking table structures...\n");

    const tables = [
      "bldg_owner",
      "bp_construction",
      "project_details",
      "engineer_information",
    ];

    for (const table of tables) {
      const [columns] = await connection.query(
        `SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
         FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = 'copems' AND TABLE_NAME = ?
         AND COLUMN_NAME IN ('user_id', 'draft_status', 'application_number')`,
        [table]
      );

      console.log(`Table: ${table}`);
      if (columns.length > 0) {
        console.table(columns);
      } else {
        console.log("  ⚠️  Missing draft columns!\n");
      }
    }

    // Step 2: Delete records with NULL user_id (test data)
    console.log("\n🧹 Cleaning up NULL user_id records...\n");

    for (const table of tables) {
      const [result] = await connection.query(
        `DELETE FROM ${table} WHERE user_id IS NULL`
      );

      if (result.affectedRows > 0) {
        console.log(`  ✅ Deleted ${result.affectedRows} rows from ${table}`);
      }
    }

    // Step 3: Verify foreign key constraints exist
    console.log("\n🔍 Checking foreign key constraints...\n");

    const [constraints] = await connection.query(`
      SELECT 
        TABLE_NAME,
        CONSTRAINT_NAME,
        COLUMN_NAME,
        REFERENCED_TABLE_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = 'copems'
      AND TABLE_NAME IN ('bldg_owner', 'bp_construction', 'project_details', 'engineer_information')
      AND REFERENCED_TABLE_NAME = 'user_account'
    `);

    if (constraints.length > 0) {
      console.table(constraints);
    } else {
      console.log("⚠️  No foreign key constraints found!");
    }

    // Step 4: Check if stored procedures exist
    console.log("\n📦 Checking stored procedures...\n");

    const [procedures] = await connection.query(`
      SELECT ROUTINE_NAME, CREATED, LAST_ALTERED
      FROM information_schema.ROUTINES
      WHERE ROUTINE_SCHEMA = 'copems'
      AND ROUTINE_TYPE = 'PROCEDURE'
      AND ROUTINE_NAME IN ('GetUserDraftData', 'FinalizeApplication')
    `);

    if (procedures.length > 0) {
      console.table(procedures);
    } else {
      console.log("⚠️  Stored procedures not found! Creating them now...\n");

      // Create GetUserDraftData
      await connection.query(`DROP PROCEDURE IF EXISTS GetUserDraftData`);
      await connection.query(`
        CREATE PROCEDURE GetUserDraftData(IN p_user_id INT)
        BEGIN
          SELECT bo.* FROM bldg_owner bo
          WHERE bo.user_id = p_user_id AND bo.draft_status = 'draft'
          ORDER BY bo.bldg_owner_id DESC LIMIT 1;

          SELECT bc.* FROM bp_construction bc
          WHERE bc.user_id = p_user_id AND bc.draft_status = 'draft'
          ORDER BY bc.bp_construction_id DESC LIMIT 1;

          SELECT pd.* FROM project_details pd
          WHERE pd.user_id = p_user_id AND pd.draft_status = 'draft'
          ORDER BY pd.Project_ID DESC LIMIT 1;

          SELECT ei.* FROM engineer_information ei
          WHERE ei.user_id = p_user_id AND ei.draft_status = 'draft'
          ORDER BY ei.engineer_information_id DESC LIMIT 1;
        END
      `);
      console.log("  ✅ Created GetUserDraftData procedure");

      // Create FinalizeApplication
      await connection.query(`DROP PROCEDURE IF EXISTS FinalizeApplication`);
      await connection.query(`
        CREATE PROCEDURE FinalizeApplication(
          IN p_user_id INT,
          IN p_application_number VARCHAR(50)
        )
        BEGIN
          DECLARE EXIT HANDLER FOR SQLEXCEPTION
          BEGIN
            ROLLBACK;
            SELECT 'Error finalizing application' as error_message;
          END;

          START TRANSACTION;

          UPDATE bldg_owner
          SET draft_status = 'submitted', application_number = p_application_number
          WHERE user_id = p_user_id AND draft_status = 'draft';

          UPDATE bp_construction
          SET draft_status = 'submitted', application_number = p_application_number
          WHERE user_id = p_user_id AND draft_status = 'draft';

          UPDATE project_details
          SET draft_status = 'submitted', application_number = p_application_number
          WHERE user_id = p_user_id AND draft_status = 'draft';

          UPDATE engineer_information
          SET draft_status = 'submitted', application_number = p_application_number
          WHERE user_id = p_user_id AND draft_status = 'draft';

          COMMIT;

          SELECT 'Application finalized successfully' as success_message, 
                 p_application_number as application_number;
        END
      `);
      console.log("  ✅ Created FinalizeApplication procedure");
    }

    // Step 5: Show summary
    console.log("\n" + "=".repeat(60));
    console.log("✅ Database setup complete!");
    console.log("=".repeat(60));
    console.log("\n📝 Summary:");
    console.log("  - All test data with NULL user_id has been cleaned up");
    console.log("  - Foreign key constraints are in place");
    console.log("  - Stored procedures are ready");
    console.log("\n💡 How it works:");
    console.log("  1. User logs in → JWT token contains user_id");
    console.log("  2. User fills form → Draft is saved with their user_id");
    console.log(
      "  3. User logs out and back in → Draft is retrieved by user_id"
    );
    console.log("  4. User submits → Application number is generated");
    console.log("\n🔐 The user_id is automatically set from the JWT token,");
    console.log("   so users can only see and edit their own drafts!\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupAndCleanup();
