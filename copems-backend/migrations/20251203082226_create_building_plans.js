import {
  createProcedures,
  dropProcedures,
} from "../routes/procedures/building_plans_procedures.js";

export async function up(knex) {
  const tableName = "building_plans";
  const hasTable = await knex.schema.hasTable(tableName);

  if (!hasTable) {
    await knex.schema.createTable(tableName, function (table) {
      table.increments("plan_id").primary();

      // Foreign key to link to the main application (if one exists)
      table.integer("application_id").unsigned().nullable();
      // table.foreign("application_id").references("application_id").inTable("applications");

      // These columns store the URL/Path to the A4 PDF file.
      table.string("architectural_plans_uri", 255).nullable();
      table.string("civil_structural_plans_uri", 255).nullable();
      table.string("mechanical_plan_uri", 255).nullable();
      table.string("electrical_plans_uri", 255).nullable();
      table.string("plumbing_plans_uri", 255).nullable();

      // Metadata
      table.timestamp("uploaded_at").defaultTo(knex.fn.now());
      table.timestamps(true, true);
    });
  }

  await createProcedures(knex);
}

export async function down(knex) {
  const tableName = "building_plans";
  await dropProcedures(knex);
  await knex.schema.dropTable(tableName);
}
