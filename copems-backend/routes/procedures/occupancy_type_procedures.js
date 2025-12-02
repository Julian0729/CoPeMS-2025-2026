export async function createProcedures(knex) {
  // --- READ Procedures ---

  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllOccupancyTypes`);
  await knex.raw(`
    CREATE PROCEDURE GetAllOccupancyTypes()
    BEGIN
      SELECT * FROM occupancy_type
      ORDER BY occupancy_type_id ASC;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS GetOccupancyTypeById`);
  await knex.raw(`
    CREATE PROCEDURE GetOccupancyTypeById(IN p_id INT)
    BEGIN
      SELECT * FROM occupancy_type
      WHERE occupancy_type_id = p_id;
    END
  `);

  // --- CREATE Procedure ---

  await knex.raw(`DROP PROCEDURE IF EXISTS InsertOccupancyType`);
  await knex.raw(`
    CREATE PROCEDURE InsertOccupancyType(
      IN p_type_name VARCHAR(50),
      IN p_description VARCHAR(255)
    )
    BEGIN
      INSERT INTO occupancy_type (
        type_name,
        description
      ) VALUES (
        p_type_name,
        p_description
      );
      
      SELECT * FROM occupancy_type
      WHERE occupancy_type_id = LAST_INSERT_ID();
    END
  `);

  // --- UPDATE Procedure ---

  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateOccupancyType`);
  await knex.raw(`
    CREATE PROCEDURE UpdateOccupancyType(
      IN p_id INT,
      IN p_type_name VARCHAR(50),
      IN p_description VARCHAR(255)
    )
    BEGIN
      UPDATE occupancy_type
      SET 
        type_name = COALESCE(p_type_name, type_name),
        description = COALESCE(p_description, description)
      WHERE occupancy_type_id = p_id;
      
      SELECT * FROM occupancy_type
      WHERE occupancy_type_id = p_id;
    END
  `);

  // --- DELETE Procedure ---

  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteOccupancyType`);
  await knex.raw(`
    CREATE PROCEDURE DeleteOccupancyType(IN p_id INT)
    BEGIN
      DELETE FROM occupancy_type
      WHERE occupancy_type_id = p_id;
    END
  `);
}

// --- DROP Procedures ---

export async function dropProcedures(knex) {
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllOccupancyTypes`);
  await knex.raw(`DROP PROCEDURE IF EXISTS GetOccupancyTypeById`);
  await knex.raw(`DROP PROCEDURE IF EXISTS InsertOccupancyType`);
  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateOccupancyType`);
  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteOccupancyType`);
}
