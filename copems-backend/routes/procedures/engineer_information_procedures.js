// Stored procedures for engineer_information table
export async function createProcedures(knex) {
  // === GetAllEngineerInformation ===
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllEngineerInformation`);
  await knex.raw(`
    CREATE PROCEDURE GetAllEngineerInformation()
    BEGIN
      SELECT * FROM engineer_information
      ORDER BY engineer_id DESC;
    END
  `);

  // === GetEngineerInformationById ===
  await knex.raw(`DROP PROCEDURE IF EXISTS GetEngineerInformationById`);
  await knex.raw(`
    CREATE PROCEDURE GetEngineerInformationById(IN p_id INT)
    BEGIN
      SELECT * FROM engineer_information
      WHERE engineer_id = p_id;
    END
  `);

  // === InsertEngineerInformation ===
  await knex.raw(`DROP PROCEDURE IF EXISTS InsertEngineerInformation`);
  await knex.raw(`
    CREATE PROCEDURE InsertEngineerInformation(
      IN p_last_name VARCHAR(100),
      IN p_first_name VARCHAR(100),
      IN p_middle_initial VARCHAR(5),
      IN p_prc_no VARCHAR(50),
      IN p_prc_validity DATE,
      IN p_ptr_no VARCHAR(50),
      IN p_ptr_date_issued DATE,
      IN p_ptr_issued_at VARCHAR(100),
      IN p_tin VARCHAR(20)
    )
    BEGIN
      INSERT INTO engineer_information (
        last_name,
        first_name,
        middle_initial,
        prc_no,
        prc_validity,
        ptr_no,
        ptr_date_issued,
        ptr_issued_at,
        tin
      ) VALUES (
        p_last_name,
        p_first_name,
        p_middle_initial,
        p_prc_no,
        p_prc_validity,
        p_ptr_no,
        p_ptr_date_issued,
        p_ptr_issued_at,
        p_tin
      );
      SELECT * FROM engineer_information
      WHERE engineer_id = LAST_INSERT_ID();
    END
  `);

  // === UpdateEngineerInformation ===
  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateEngineerInformation`);
  await knex.raw(`
    CREATE PROCEDURE UpdateEngineerInformation(
      IN p_id INT,
      IN p_last_name VARCHAR(100),
      IN p_first_name VARCHAR(100),
      IN p_middle_initial VARCHAR(5),
      IN p_prc_no VARCHAR(50),
      IN p_prc_validity DATE,
      IN p_ptr_no VARCHAR(50),
      IN p_ptr_date_issued DATE,
      IN p_ptr_issued_at VARCHAR(100),
      IN p_tin VARCHAR(20)
    )
    BEGIN
      UPDATE engineer_information
      SET
        last_name = COALESCE(p_last_name, last_name),
        first_name = COALESCE(p_first_name, first_name),
        middle_initial = COALESCE(p_middle_initial, middle_initial),
        prc_no = COALESCE(p_prc_no, prc_no),
        prc_validity = COALESCE(p_prc_validity, prc_validity),
        ptr_no = COALESCE(p_ptr_no, ptr_no),
        ptr_date_issued = COALESCE(p_ptr_date_issued, ptr_date_issued),
        ptr_issued_at = COALESCE(p_ptr_issued_at, ptr_issued_at),
        tin = COALESCE(p_tin, tin)
      WHERE engineer_id = p_id;
      SELECT * FROM engineer_information
      WHERE engineer_id = p_id;
    END
  `);

  // === DeleteEngineerInformation ===
  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteEngineerInformation`);
  await knex.raw(`
    CREATE PROCEDURE DeleteEngineerInformation(IN p_id INT)
    BEGIN
      DELETE FROM engineer_information
      WHERE engineer_id = p_id;
    END
  `);
}

export async function dropProcedures(knex) {
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllEngineerInformation`);
  await knex.raw(`DROP PROCEDURE IF EXISTS GetEngineerInformationById`);
  await knex.raw(`DROP PROCEDURE IF EXISTS InsertEngineerInformation`);
  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateEngineerInformation`);
  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteEngineerInformation`);
}
