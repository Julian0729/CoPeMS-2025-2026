import {
  createProcedures,
  dropProcedures,
} from "../routes/procedures/project_details_procedures.js";

export async function up(knex) {
  const hasTable = await knex.schema.hasTable("project_details");

  if (!hasTable) {
    await knex.schema.createTable("project_details", function (table) {
      table.increments("project_details_id").primary();

      table.integer("application_id").unsigned().nullable();

      table.string("occupancy_classified", 255).notNullable();

      table.decimal("total_estimated_cost", 14, 2).defaultTo(0.0);

      table.integer("number_of_units").unsigned().nullable();

      table.integer("number_of_storey").unsigned().nullable();

      table.decimal("total_floor_area_sqm", 10, 2).nullable();

      table.decimal("lot_area_sqm", 10, 2).nullable();

      table.decimal("building_cost", 14, 2).defaultTo(0.0);
      table.decimal("electrical_cost", 14, 2).defaultTo(0.0);
      table.decimal("mechanical_cost", 14, 2).defaultTo(0.0);
      table.decimal("electronics_cost", 14, 2).defaultTo(0.0);
      table.decimal("plumbing_cost", 14, 2).defaultTo(0.0);
      table.decimal("others_cost", 14, 2).defaultTo(0.0);

      table.date("proposed_date_of_construction").nullable();

      table.date("expected_date_of_completion").nullable();

      table.timestamps(true, true);
    });
  }

  await createProcedures(knex);
}

export async function down(knex) {
  await dropProcedures(knex);
  await knex.schema.dropTableIfExists("project_details");
}
