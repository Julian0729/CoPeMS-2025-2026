// Stored procedures for building_plans table

export async function createProcedures(knex) {
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllBuildingPlans`);
  await knex.raw(`
    CREATE PROCEDURE GetAllBuildingPlans()
    BEGIN
      SELECT * FROM building_plans
      ORDER BY plan_id DESC;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS GetBuildingPlanById`);
  await knex.raw(`
    CREATE PROCEDURE GetBuildingPlanById(IN p_id INT)
    BEGIN
      SELECT * FROM building_plans
      WHERE plan_id = p_id;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS GetBuildingPlansByApplicationId`);
  await knex.raw(`
    CREATE PROCEDURE GetBuildingPlansByApplicationId(IN p_application_id INT)
    BEGIN
      SELECT * FROM building_plans
      WHERE application_id = p_application_id
      ORDER BY plan_id DESC;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS InsertBuildingPlan`);
  await knex.raw(`
    CREATE PROCEDURE InsertBuildingPlan(
      IN p_application_id INT,
      IN p_architectural_plans_uri VARCHAR(255),
      IN p_civil_structural_plans_uri VARCHAR(255),
      IN p_mechanical_plan_uri VARCHAR(255),
      IN p_electrical_plans_uri VARCHAR(255),
      IN p_plumbing_plans_uri VARCHAR(255)
    )
    BEGIN
      INSERT INTO building_plans (
        application_id,
        architectural_plans_uri,
        civil_structural_plans_uri,
        mechanical_plan_uri,
        electrical_plans_uri,
        plumbing_plans_uri
      ) VALUES (
        p_application_id,
        p_architectural_plans_uri,
        p_civil_structural_plans_uri,
        p_mechanical_plan_uri,
        p_electrical_plans_uri,
        p_plumbing_plans_uri
      );
      
      SELECT * FROM building_plans
      WHERE plan_id = LAST_INSERT_ID();
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateBuildingPlan`);
  await knex.raw(`
    CREATE PROCEDURE UpdateBuildingPlan(
      IN p_id INT,
      IN p_application_id INT,
      IN p_architectural_plans_uri VARCHAR(255),
      IN p_civil_structural_plans_uri VARCHAR(255),
      IN p_mechanical_plan_uri VARCHAR(255),
      IN p_electrical_plans_uri VARCHAR(255),
      IN p_plumbing_plans_uri VARCHAR(255)
    )
    BEGIN
      UPDATE building_plans
      SET 
        application_id = COALESCE(p_application_id, application_id),
        architectural_plans_uri = COALESCE(p_architectural_plans_uri, architectural_plans_uri),
        civil_structural_plans_uri = COALESCE(p_civil_structural_plans_uri, civil_structural_plans_uri),
        mechanical_plan_uri = COALESCE(p_mechanical_plan_uri, mechanical_plan_uri),
        electrical_plans_uri = COALESCE(p_electrical_plans_uri, electrical_plans_uri),
        plumbing_plans_uri = COALESCE(p_plumbing_plans_uri, plumbing_plans_uri)
      WHERE plan_id = p_id;
      
      SELECT * FROM building_plans
      WHERE plan_id = p_id;
    END
  `);

  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteBuildingPlan`);
  await knex.raw(`
    CREATE PROCEDURE DeleteBuildingPlan(IN p_id INT)
    BEGIN
      DELETE FROM building_plans
      WHERE plan_id = p_id;
    END
  `);
}

export async function dropProcedures(knex) {
  await knex.raw(`DROP PROCEDURE IF EXISTS GetAllBuildingPlans`);
  await knex.raw(`DROP PROCEDURE IF EXISTS GetBuildingPlanById`);
  await knex.raw(`DROP PROCEDURE IF EXISTS GetBuildingPlansByApplicationId`);
  await knex.raw(`DROP PROCEDURE IF EXISTS InsertBuildingPlan`);
  await knex.raw(`DROP PROCEDURE IF EXISTS UpdateBuildingPlan`);
  await knex.raw(`DROP PROCEDURE IF EXISTS DeleteBuildingPlan`);
}
