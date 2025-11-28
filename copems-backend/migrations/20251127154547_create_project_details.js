import {
  createProcedures,
  dropProcedures,
} from "../routes/procedures/project_details_procedures.js"; // Assuming you will create procedures for this table

export async function up(knex) {
  const hasTable = await knex.schema.hasTable("project_details");

  if (!hasTable) {
    await knex.schema.createTable("project_details", function (table) {
      // Primary Key
      table.increments("project_details_id").primary();

      // Foreign Key (Assuming this table relates to a primary application or permit)
      // You may need to replace 'application' with your actual primary table name (e.g., 'permit_application')
      table.integer("application_id").unsigned().nullable();

      // Fields from the image
      // Occupancy Classified
      table.string("occupancy_classified", 255).notNullable();

      // Total Estimated Cost - Stored as a large integer (in cents/centavos) to avoid floating point issues, or as a decimal
      // Using 'decimal' is common for currency in some systems.
      table.decimal("total_estimated_cost", 14, 2).defaultTo(0.0);

      // Number of Units
      table.integer("number_of_units").unsigned().nullable();

      // Number of Storey
      table.integer("number_of_storey").unsigned().nullable();

      // Total Floor Area (sq. m) - Using decimal for possible non-integer areas
      table.decimal("total_floor_area_sqm", 10, 2).nullable();

      // Lot Area (sq. m) - Using decimal for possible non-integer areas
      table.decimal("lot_area_sqm", 10, 2).nullable();

      // Breakdown of Estimated Costs (Optional, but useful for structured data)
      table.decimal("building_cost", 14, 2).defaultTo(0.0);
      table.decimal("electrical_cost", 14, 2).defaultTo(0.0);
      table.decimal("mechanical_cost", 14, 2).defaultTo(0.0);
      table.decimal("electronics_cost", 14, 2).defaultTo(0.0);
      table.decimal("plumbing_cost", 14, 2).defaultTo(0.0);
      table.decimal("others_cost", 14, 2).defaultTo(0.0);

      // Proposed Date of Construction
      table.date("proposed_date_of_construction").nullable();

      // Expected Date of Completion
      table.date("expected_date_of_completion").nullable();

      // Timestamps
      table.timestamps(true, true); // Adds created_at and updated_at
    });
  }

  await createProcedures(knex); // Create stored procedures
}

export async function down(knex) {
  await dropProcedures(knex); // Drop stored procedures
  await knex.schema.dropTableIfExists("project_details");
}
