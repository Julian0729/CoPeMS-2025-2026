// Stored procedures for bldg_owner table

export async function createProcedures(knex) {
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllBldgOwners`);
  await knex.raw(`
    CREATE PROCEDURE GetAllBldgOwners()
    BEGIN
      SELECT * FROM bldg_owner
      ORDER BY bldg_owner_id DESC;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS GetBldgOwnerById`);
  await knex.raw(`
    CREATE PROCEDURE GetBldgOwnerById(IN p_id INT)
    BEGIN
      SELECT * FROM bldg_owner
      WHERE bldg_owner_id = p_id;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS InsertBldgOwner`);
  await knex.raw(`
    CREATE PROCEDURE InsertBldgOwner(
      IN p_last_name VARCHAR(100),
      IN p_first_name VARCHAR(100),
      IN p_middle_initial VARCHAR(5),
      IN p_tin VARCHAR(20),
      IN p_is_enterprise BOOLEAN,
      IN p_form_of_ownership VARCHAR(100),
      IN p_province VARCHAR(100),
      IN p_city_municipality VARCHAR(100),
      IN p_barangay VARCHAR(100),
      IN p_house_no VARCHAR(50),
      IN p_street VARCHAR(100),
      IN p_contact_no VARCHAR(30)
    )
    BEGIN
      INSERT INTO bldg_owner (
        last_name,
        first_name,
        middle_initial,
        tin,
        is_enterprise,
        form_of_ownership,
        province,
        city_municipality,
        barangay,
        house_no,
        street,
        contact_no
      ) VALUES (
        p_last_name,
        p_first_name,
        p_middle_initial,
        p_tin,
        p_is_enterprise,
        p_form_of_ownership,
        p_province,
        p_city_municipality,
        p_barangay,
        p_house_no,
        p_street,
        p_contact_no
      );
      
      SELECT * FROM bldg_owner
      WHERE bldg_owner_id = LAST_INSERT_ID();
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateBldgOwner`);
  await knex.raw(`
    CREATE PROCEDURE UpdateBldgOwner(
      IN p_id INT,
      IN p_last_name VARCHAR(100),
      IN p_first_name VARCHAR(100),
      IN p_middle_initial VARCHAR(5),
      IN p_tin VARCHAR(20),
      IN p_is_enterprise BOOLEAN,
      IN p_form_of_ownership VARCHAR(100),
      IN p_province VARCHAR(100),
      IN p_city_municipality VARCHAR(100),
      IN p_barangay VARCHAR(100),
      IN p_house_no VARCHAR(50),
      IN p_street VARCHAR(100),
      IN p_contact_no VARCHAR(30)
    )
    BEGIN
      UPDATE bldg_owner
      SET 
        last_name = COALESCE(p_last_name, last_name),
        first_name = COALESCE(p_first_name, first_name),
        middle_initial = COALESCE(p_middle_initial, middle_initial),
        tin = COALESCE(p_tin, tin),
        is_enterprise = COALESCE(p_is_enterprise, is_enterprise),
        form_of_ownership = COALESCE(p_form_of_ownership, form_of_ownership),
        province = COALESCE(p_province, province),
        city_municipality = COALESCE(p_city_municipality, city_municipality),
        barangay = COALESCE(p_barangay, barangay),
        house_no = COALESCE(p_house_no, house_no),
        street = COALESCE(p_street, street),
        contact_no = COALESCE(p_contact_no, contact_no)
      WHERE bldg_owner_id = p_id;
      
      SELECT * FROM bldg_owner
      WHERE bldg_owner_id = p_id;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteBldgOwner`);
  await knex.raw(`
    CREATE PROCEDURE DeleteBldgOwner(IN p_id INT)
    BEGIN
      DELETE FROM bldg_owner
      WHERE bldg_owner_id = p_id;
    END
  `);
}

export async function dropProcedures(knex) {
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllBldgOwners`);
  await knex.raw(`DROP PROCEDURE IF EXISTS GetBldgOwnerById`);
  await knex.raw(`DROP PROCEDURE IF EXISTS InsertBldgOwner`);
  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateBldgOwner`);
  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteBldgOwner`);
}
