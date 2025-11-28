// Stored procedures for bp_construction table

export async function createProcedures(knex) {
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllBpConstructions`);
  await knex.raw(`
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

  await knex.raw(`DROP PROCEDURE IF EXISTS GetBpConstructionById`);
  await knex.raw(`
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

  await knex.raw(`DROP PROCEDURE IF EXISTS InsertBpConstruction`);
  await knex.raw(`
    CREATE PROCEDURE InsertBpConstruction(
      IN p_barangay VARCHAR(100),
      IN p_blk_no VARCHAR(50),
      IN p_street VARCHAR(100),
      IN p_tct_no VARCHAR(50),
      IN p_current_tax_dec_no VARCHAR(50),
      IN p_scope_of_work VARCHAR(100)
    )
    BEGIN
      INSERT INTO bp_construction (
        barangay,
        blk_no,
        street,
        tct_no,
        current_tax_dec_no,
        scope_of_work
      ) VALUES (
        p_barangay,
        p_blk_no,
        p_street,
        p_tct_no,
        p_current_tax_dec_no,
        p_scope_of_work
      );
      
      SELECT 
        bp_construction_id,
        barangay,
        blk_no,
        street,
        tct_no,
        current_tax_dec_no,
        scope_of_work
      FROM bp_construction
      WHERE bp_construction_id = LAST_INSERT_ID();
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateBpConstruction`);
  await knex.raw(`
    CREATE PROCEDURE UpdateBpConstruction(
      IN p_id INT,
      IN p_barangay VARCHAR(100),
      IN p_blk_no VARCHAR(50),
      IN p_street VARCHAR(100),
      IN p_tct_no VARCHAR(50),
      IN p_current_tax_dec_no VARCHAR(50),
      IN p_scope_of_work VARCHAR(100)
    )
    BEGIN
      UPDATE bp_construction
      SET 
        barangay = COALESCE(p_barangay, barangay),
        blk_no = COALESCE(p_blk_no, blk_no),
        street = COALESCE(p_street, street),
        tct_no = COALESCE(p_tct_no, tct_no),
        current_tax_dec_no = COALESCE(p_current_tax_dec_no, current_tax_dec_no),
        scope_of_work = COALESCE(p_scope_of_work, scope_of_work)
      WHERE bp_construction_id = p_id;
      
      SELECT 
        bp_construction_id,
        barangay,
        blk_no,
        street,
        tct_no,
        current_tax_dec_no,
        scope_of_work
      FROM bp_construction
      WHERE bp_construction_id = p_id;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteBpConstruction`);
  await knex.raw(`
    CREATE PROCEDURE DeleteBpConstruction(IN p_id INT)
    BEGIN
      DELETE FROM bp_construction
      WHERE bp_construction_id = p_id;
    END
  `);
}

export async function dropProcedures(knex) {
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllBpConstructions`);
  await knex.raw(`DROP PROCEDURE IF EXISTS GetBpConstructionById`);
  await knex.raw(`DROP PROCEDURE IF EXISTS InsertBpConstruction`);
  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateBpConstruction`);
  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteBpConstruction`);
}
