export async function createProcedures(knex) {
  // --- READ Procedures ---

  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllProjectDetails`);
  await knex.raw(`
    CREATE PROCEDURE GetAllProjectDetails()
    BEGIN
      SELECT * FROM project_details
      ORDER BY project_details_id DESC;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS GetProjectDetailsById`);
  await knex.raw(`
    CREATE PROCEDURE GetProjectDetailsById(IN p_id INT)
    BEGIN
      SELECT * FROM project_details
      WHERE project_details_id = p_id;
    END
  `);

  // --- CREATE Procedure ---

  await knex.raw(`DROP PROCEDURE IF EXISTS InsertProjectDetails`);
  await knex.raw(`
    CREATE PROCEDURE InsertProjectDetails(
      IN p_application_id INT,
      IN p_occupancy_classified VARCHAR(255),
      IN p_total_estimated_cost DECIMAL(14, 2),
      IN p_number_of_units INT,
      IN p_number_of_storey INT,
      IN p_total_floor_area_sqm DECIMAL(10, 2),
      IN p_lot_area_sqm DECIMAL(10, 2),
      IN p_building_cost DECIMAL(14, 2),
      IN p_electrical_cost DECIMAL(14, 2),
      IN p_mechanical_cost DECIMAL(14, 2),
      IN p_electronics_cost DECIMAL(14, 2),
      IN p_plumbing_cost DECIMAL(14, 2),
      IN p_others_cost DECIMAL(14, 2),
      IN p_proposed_date_of_construction DATE,
      IN p_expected_date_of_completion DATE
    )
    BEGIN
      INSERT INTO project_details (
        application_id,
        occupancy_classified,
        total_estimated_cost,
        number_of_units,
        number_of_storey,
        total_floor_area_sqm,
        lot_area_sqm,
        building_cost,
        electrical_cost,
        mechanical_cost,
        electronics_cost,
        plumbing_cost,
        others_cost,
        proposed_date_of_construction,
        expected_date_of_completion
      ) VALUES (
        p_application_id,
        p_occupancy_classified,
        p_total_estimated_cost,
        p_number_of_units,
        p_number_of_storey,
        p_total_floor_area_sqm,
        p_lot_area_sqm,
        p_building_cost,
        p_electrical_cost,
        p_mechanical_cost,
        p_electronics_cost,
        p_plumbing_cost,
        p_others_cost,
        p_proposed_date_of_construction,
        p_expected_date_of_completion
      );
      
      SELECT * FROM project_details
      WHERE project_details_id = LAST_INSERT_ID();
    END
  `);

  // --- UPDATE Procedure ---

  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateProjectDetails`);
  await knex.raw(`
    CREATE PROCEDURE UpdateProjectDetails(
      IN p_id INT,
      IN p_occupancy_classified VARCHAR(255),
      IN p_total_estimated_cost DECIMAL(14, 2),
      IN p_number_of_units INT,
      IN p_number_of_storey INT,
      IN p_total_floor_area_sqm DECIMAL(10, 2),
      IN p_lot_area_sqm DECIMAL(10, 2),
      IN p_building_cost DECIMAL(14, 2),
      IN p_electrical_cost DECIMAL(14, 2),
      IN p_mechanical_cost DECIMAL(14, 2),
      IN p_electronics_cost DECIMAL(14, 2),
      IN p_plumbing_cost DECIMAL(14, 2),
      IN p_others_cost DECIMAL(14, 2),
      IN p_proposed_date_of_construction DATE,
      IN p_expected_date_of_completion DATE
    )
    BEGIN
      UPDATE project_details
      SET 
        occupancy_classified = COALESCE(p_occupancy_classified, occupancy_classified),
        total_estimated_cost = COALESCE(p_total_estimated_cost, total_estimated_cost),
        number_of_units = COALESCE(p_number_of_units, number_of_units),
        number_of_storey = COALESCE(p_number_of_storey, number_of_storey),
        total_floor_area_sqm = COALESCE(p_total_floor_area_sqm, total_floor_area_sqm),
        lot_area_sqm = COALESCE(p_lot_area_sqm, lot_area_sqm),
        building_cost = COALESCE(p_building_cost, building_cost),
        electrical_cost = COALESCE(p_electrical_cost, electrical_cost),
        mechanical_cost = COALESCE(p_mechanical_cost, mechanical_cost),
        electronics_cost = COALESCE(p_electronics_cost, electronics_cost),
        plumbing_cost = COALESCE(p_plumbing_cost, plumbing_cost),
        others_cost = COALESCE(p_others_cost, others_cost),
        proposed_date_of_construction = COALESCE(p_proposed_date_of_construction, proposed_date_of_construction),
        expected_date_of_completion = COALESCE(p_expected_date_of_completion, expected_date_of_completion)
      WHERE project_details_id = p_id;
      
      SELECT * FROM project_details
      WHERE project_details_id = p_id;
    END
  `);

  // --- DELETE Procedure ---

  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteProjectDetails`);
  await knex.raw(`
    CREATE PROCEDURE DeleteProjectDetails(IN p_id INT)
    BEGIN
      DELETE FROM project_details
      WHERE project_details_id = p_id;
    END
  `);
}

// --- DROP Procedures ---

export async function dropProcedures(knex) {
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllProjectDetails`);
  await knex.raw(`DROP PROCEDURE IF EXISTS GetProjectDetailsById`);
  await knex.raw(`DROP PROCEDURE IF EXISTS InsertProjectDetails`);
  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateProjectDetails`);
  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteProjectDetails`);
}
