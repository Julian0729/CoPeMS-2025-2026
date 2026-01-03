import mysql from "mysql2/promise";

async function fixForeignKeys() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "copems",
      multipleStatements: true,
    });

    console.log("✅ Connected to database\n");

    // Check for existing foreign keys
    const [constraints] = await connection.query(`
      SELECT 
        TABLE_NAME,
        CONSTRAINT_NAME,
        COLUMN_NAME,
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = 'copems'
      AND TABLE_NAME IN ('bldg_owner', 'bp_construction', 'project_details', 'engineer_information')
      AND REFERENCED_TABLE_NAME = 'user_account'
    `);

    console.log("📋 Existing foreign key constraints:");
    console.table(constraints);

    // Fix the data types to match and add foreign keys if not exist
    console.log(
      "\n🔧 Fixing user_id column types and adding foreign keys...\n"
    );

    const tables = [
      "bldg_owner",
      "bp_construction",
      "project_details",
      "engineer_information",
    ];

    for (const table of tables) {
      try {
        // First, modify the column type to match user_account.User_ID
        await connection.query(`
          ALTER TABLE \`${table}\`
          MODIFY COLUMN \`user_id\` INT(11) NULL
        `);
        console.log(`✅ Updated user_id type in ${table}`);

        // Try to add foreign key constraint
        const constraintName = `fk_${table}_user`;
        await connection.query(`
          ALTER TABLE \`${table}\`
          ADD CONSTRAINT \`${constraintName}\`
          FOREIGN KEY (\`user_id\`) REFERENCES \`user_account\` (\`User_ID\`) ON DELETE CASCADE
        `);
        console.log(`✅ Added foreign key constraint to ${table}`);
      } catch (error) {
        if (error.code === "ER_DUP_KEYNAME") {
          console.log(`ℹ️  Foreign key already exists for ${table}`);
        } else if (error.code === "ER_FK_DUP_NAME") {
          console.log(`ℹ️  Foreign key already exists for ${table}`);
        } else {
          console.error(`❌ Error on ${table}:`, error.message);
        }
      }
    }

    // Check if stored procedures exist
    const [procedures] = await connection.query(`
      SELECT ROUTINE_NAME
      FROM information_schema.ROUTINES
      WHERE ROUTINE_SCHEMA = 'copems'
      AND ROUTINE_TYPE = 'PROCEDURE'
      AND ROUTINE_NAME IN ('GetUserDraftData', 'FinalizeApplication')
    `);

    console.log("\n📋 Existing stored procedures:");
    console.table(procedures);

    if (procedures.length === 0) {
      console.log("\n🔧 Creating stored procedures...\n");

      // Create GetUserDraftData procedure
      await connection.query(`DROP PROCEDURE IF EXISTS GetUserDraftData`);
      await connection.query(`
        CREATE PROCEDURE GetUserDraftData(IN p_user_id INT)
        BEGIN
          SELECT
            'building_owner' as data_type,
            bo.*
          FROM bldg_owner bo
          WHERE bo.user_id = p_user_id
          AND bo.draft_status = 'draft'
          ORDER BY bo.bldg_owner_id DESC
          LIMIT 1;

          SELECT
            'construction' as data_type,
            bc.*
          FROM bp_construction bc
          WHERE bc.user_id = p_user_id
          AND bc.draft_status = 'draft'
          ORDER BY bc.bp_construction_id DESC
          LIMIT 1;

          SELECT
            'project_details' as data_type,
            pd.*
          FROM project_details pd
          WHERE pd.user_id = p_user_id
          AND pd.draft_status = 'draft'
          ORDER BY pd.Project_ID DESC
          LIMIT 1;

          SELECT
            'engineer_information' as data_type,
            ei.*
          FROM engineer_information ei
          WHERE ei.user_id = p_user_id
          AND ei.draft_status = 'draft'
          ORDER BY ei.engineer_information_id DESC
          LIMIT 1;
        END
      `);
      console.log("✅ Created GetUserDraftData procedure");

      // Create FinalizeApplication procedure
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
            SELECT 'Error finalizing application' as error;
          END;

          START TRANSACTION;

          UPDATE bldg_owner
          SET draft_status = 'submitted',
              application_number = p_application_number
          WHERE user_id = p_user_id
          AND draft_status = 'draft';

          UPDATE bp_construction
          SET draft_status = 'submitted',
              application_number = p_application_number
          WHERE user_id = p_user_id
          AND draft_status = 'draft';

          UPDATE project_details
          SET draft_status = 'submitted',
              application_number = p_application_number
          WHERE user_id = p_user_id
          AND draft_status = 'draft';

          UPDATE engineer_information
          SET draft_status = 'submitted',
              application_number = p_application_number
          WHERE user_id = p_user_id
          AND draft_status = 'draft';

          COMMIT;

          SELECT 'Application finalized successfully' as success, p_application_number as application_number;
        END
      `);
      console.log("✅ Created FinalizeApplication procedure");
    } else {
      console.log("ℹ️  Stored procedures already exist");
    }

    console.log("\n✅ Draft system setup complete!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixForeignKeys();
