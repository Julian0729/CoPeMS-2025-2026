// Stored procedures for lot_representative table

export async function createProcedures(knex) {
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllLotRepresentatives`);
  await knex.raw(`
    CREATE PROCEDURE GetAllLotRepresentatives()
    BEGIN
      SELECT 
        lr.*,
        p.province_name,
        bl.barangay_name
      FROM lot_representative lr
      LEFT JOIN provinces p ON lr.province_id = p.province_id
      LEFT JOIN barangay_list bl ON lr.barangay_id = bl.barangay_id
      ORDER BY lr.lot_rep_id DESC;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS GetLotRepresentativeById`);
  await knex.raw(`
    CREATE PROCEDURE GetLotRepresentativeById(IN p_id INT)
    BEGIN
      SELECT 
        lr.*,
        p.province_name,
        bl.barangay_name
      FROM lot_representative lr
      LEFT JOIN provinces p ON lr.province_id = p.province_id
      LEFT JOIN barangay_list bl ON lr.barangay_id = bl.barangay_id
      WHERE lr.lot_rep_id = p_id;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS InsertLotRepresentative`);
  await knex.raw(`
    CREATE PROCEDURE InsertLotRepresentative(
      IN p_last_name VARCHAR(100),
      IN p_first_name VARCHAR(100),
      IN p_middle_initial VARCHAR(5),
      IN p_house_no VARCHAR(50),
      IN p_street VARCHAR(200),
      IN p_govt_issued_id_no VARCHAR(50),
      IN p_date_issued DATE,
      IN p_place_issued VARCHAR(100),
      IN p_province_id INT,
      IN p_barangay_id INT
    )
    BEGIN
      INSERT INTO lot_representative (
        last_name,
        first_name,
        middle_initial,
        house_no,
        street,
        govt_issued_id_no,
        date_issued,
        place_issued,
        province_id,
        barangay_id
      ) VALUES (
        p_last_name,
        p_first_name,
        p_middle_initial,
        p_house_no,
        p_street,
        p_govt_issued_id_no,
        p_date_issued,
        p_place_issued,
        p_province_id,
        p_barangay_id
      );
      
      SELECT 
        lr.*,
        p.province_name,
        bl.barangay_name
      FROM lot_representative lr
      LEFT JOIN provinces p ON lr.province_id = p.province_id
      LEFT JOIN barangay_list bl ON lr.barangay_id = bl.barangay_id
      WHERE lr.lot_rep_id = LAST_INSERT_ID();
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateLotRepresentative`);
  await knex.raw(`
    CREATE PROCEDURE UpdateLotRepresentative(
      IN p_id INT,
      IN p_last_name VARCHAR(100),
      IN p_first_name VARCHAR(100),
      IN p_middle_initial VARCHAR(5),
      IN p_house_no VARCHAR(50),
      IN p_street VARCHAR(200),
      IN p_govt_issued_id_no VARCHAR(50),
      IN p_date_issued DATE,
      IN p_place_issued VARCHAR(100),
      IN p_province_id INT,
      IN p_barangay_id INT
    )
    BEGIN
      UPDATE lot_representative
      SET 
        last_name = COALESCE(p_last_name, last_name),
        first_name = COALESCE(p_first_name, first_name),
        middle_initial = COALESCE(p_middle_initial, middle_initial),
        house_no = COALESCE(p_house_no, house_no),
        street = COALESCE(p_street, street),
        govt_issued_id_no = COALESCE(p_govt_issued_id_no, govt_issued_id_no),
        date_issued = COALESCE(p_date_issued, date_issued),
        place_issued = COALESCE(p_place_issued, place_issued),
        province_id = COALESCE(p_province_id, province_id),
        barangay_id = COALESCE(p_barangay_id, barangay_id)
      WHERE lot_rep_id = p_id;
      
      SELECT 
        lr.*,
        p.province_name,
        bl.barangay_name
      FROM lot_representative lr
      LEFT JOIN provinces p ON lr.province_id = p.province_id
      LEFT JOIN barangay_list bl ON lr.barangay_id = bl.barangay_id
      WHERE lr.lot_rep_id = p_id;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteLotRepresentative`);
  await knex.raw(`
    CREATE PROCEDURE DeleteLotRepresentative(IN p_id INT)
    BEGIN
      DELETE FROM lot_representative
      WHERE lot_rep_id = p_id;
    END
  `);
}

export async function dropProcedures(knex) {
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllLotRepresentatives`);
  await knex.raw(`DROP PROCEDURE IF EXISTS GetLotRepresentativeById`);
  await knex.raw(`DROP PROCEDURE IF EXISTS InsertLotRepresentative`);
  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateLotRepresentative`);
  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteLotRepresentative`);
}
