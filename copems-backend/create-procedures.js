import mysql from "mysql2/promise";

async function setupDraftProcedures() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "copems",
    });

    console.log("✅ Connected to database\n");

    // Create GetUserDraftData procedure
    console.log("🔧 Creating GetUserDraftData procedure...");
    await connection.query(`DROP PROCEDURE IF EXISTS GetUserDraftData`);
    await connection.query(`
      CREATE PROCEDURE GetUserDraftData(IN p_user_id INT)
      BEGIN
        SELECT
          bo.*
        FROM bldg_owner bo
        WHERE bo.user_id = p_user_id
        AND bo.draft_status = 'draft'
        ORDER BY bo.bldg_owner_id DESC
        LIMIT 1;

        SELECT
          bc.*
        FROM bp_construction bc
        WHERE bc.user_id = p_user_id
        AND bc.draft_status = 'draft'
        ORDER BY bc.bp_construction_id DESC
        LIMIT 1;

        SELECT
          pd.*
        FROM project_details pd
        WHERE pd.user_id = p_user_id
        AND pd.draft_status = 'draft'
        ORDER BY pd.Project_ID DESC
        LIMIT 1;

        SELECT
          ei.*
        FROM engineer_information ei
        WHERE ei.user_id = p_user_id
        AND ei.draft_status = 'draft'
        ORDER BY ei.engineer_information_id DESC
        LIMIT 1;
      END
    `);
    console.log("✅ Created GetUserDraftData procedure\n");

    // Create FinalizeApplication procedure
    console.log("🔧 Creating FinalizeApplication procedure...");
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

        SELECT 'Application finalized successfully' as success_message, p_application_number as application_number;
      END
    `);
    console.log("✅ Created FinalizeApplication procedure\n");

    console.log("✅ All stored procedures created successfully!");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDraftProcedures();
