import { pool } from "../config/database.js";

async function createBpConstructionProcedures() {
  try {
    console.log("Creating BP Construction stored procedures...");

    // Drop existing procedures
    await pool.query(`DROP PROCEDURE IF EXISTS GetAllBpConstructions`);
    await pool.query(`DROP PROCEDURE IF EXISTS GetBpConstructionById`);
    await pool.query(`DROP PROCEDURE IF EXISTS InsertBpConstruction`);
    await pool.query(`DROP PROCEDURE IF EXISTS UpdateBpConstruction`);
    await pool.query(`DROP PROCEDURE IF EXISTS DeleteBpConstruction`);

    // Create GetAllBpConstructions
    await pool.query(`
      CREATE PROCEDURE GetAllBpConstructions()
      BEGIN
        SELECT 
          bc.*,
          bl.barangay_name
        FROM bp_construction bc
        LEFT JOIN barangay_list bl ON bc.barangay = bl.barangay_name
        ORDER BY bc.bp_construction_id DESC;
      END
    `);
    console.log("✅ Created GetAllBpConstructions");

    // Create GetBpConstructionById
    await pool.query(`
      CREATE PROCEDURE GetBpConstructionById(IN p_id INT)
      BEGIN
        SELECT 
          bc.*,
          bl.barangay_name
        FROM bp_construction bc
        LEFT JOIN barangay_list bl ON bc.barangay = bl.barangay_name
        WHERE bc.bp_construction_id = p_id;
      END
    `);
    console.log("✅ Created GetBpConstructionById");

    // Create InsertBpConstruction
    await pool.query(`
      CREATE PROCEDURE InsertBpConstruction(
        IN p_barangay VARCHAR(100),
        IN p_blk_no VARCHAR(50),
        IN p_street VARCHAR(100),
        IN p_tct_no VARCHAR(50),
        IN p_current_tax_dec_no VARCHAR(50)
      )
      BEGIN
        INSERT INTO bp_construction (
          barangay,
          blk_no,
          street,
          tct_no,
          current_tax_dec_no
        ) VALUES (
          p_barangay,
          p_blk_no,
          p_street,
          p_tct_no,
          p_current_tax_dec_no
        );
        
        SELECT 
          bp_construction_id,
          barangay,
          blk_no,
          street,
          tct_no,
          current_tax_dec_no
        FROM bp_construction
        WHERE bp_construction_id = LAST_INSERT_ID();
      END
    `);
    console.log("✅ Created InsertBpConstruction");

    // Create UpdateBpConstruction
    await pool.query(`
      CREATE PROCEDURE UpdateBpConstruction(
        IN p_id INT,
        IN p_barangay VARCHAR(100),
        IN p_blk_no VARCHAR(50),
        IN p_street VARCHAR(100),
        IN p_tct_no VARCHAR(50),
        IN p_current_tax_dec_no VARCHAR(50)
      )
      BEGIN
        UPDATE bp_construction
        SET 
          barangay = COALESCE(p_barangay, barangay),
          blk_no = COALESCE(p_blk_no, blk_no),
          street = COALESCE(p_street, street),
          tct_no = COALESCE(p_tct_no, tct_no),
          current_tax_dec_no = COALESCE(p_current_tax_dec_no, current_tax_dec_no)
        WHERE bp_construction_id = p_id;
        
        SELECT 
          bp_construction_id,
          barangay,
          blk_no,
          street,
          tct_no,
          current_tax_dec_no
        FROM bp_construction
        WHERE bp_construction_id = p_id;
      END
    `);
    console.log("✅ Created UpdateBpConstruction");

    // Create DeleteBpConstruction
    await pool.query(`
      CREATE PROCEDURE DeleteBpConstruction(IN p_id INT)
      BEGIN
        DELETE FROM bp_construction
        WHERE bp_construction_id = p_id;
      END
    `);
    console.log("✅ Created DeleteBpConstruction");

    console.log(
      "\n🎉 All BP Construction stored procedures created successfully!"
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating procedures:", error);
    process.exit(1);
  }
}

createBpConstructionProcedures();
