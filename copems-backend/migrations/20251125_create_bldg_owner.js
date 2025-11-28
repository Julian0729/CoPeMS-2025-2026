import {
  createProcedures,
  dropProcedures,
} from "../routes/procedures/bldg_owner_procedures.js";

export async function up(knex) {
  const hasTable = await knex.schema.hasTable("bldg_owner");

  if (!hasTable) {
    await knex.schema.createTable("bldg_owner", function (table) {
      table.increments("bldg_owner_id").primary();
      table.string("last_name", 100).notNullable();
      table.string("first_name", 100).notNullable();
      table.string("middle_initial", 5).nullable();
      table.string("tin", 20).nullable();
      table.boolean("is_enterprise").defaultTo(false);
      table.string("form_of_ownership", 100).nullable();
      table.string("province", 100).nullable();
      table.string("city_municipality", 100).nullable();
      table.string("barangay", 100).nullable();
      table.string("house_no", 50).nullable();
      table.string("street", 100).nullable();
      table.string("contact_no", 30).nullable();
    });
  }

  await createProcedures(knex);
}

export async function down(knex) {
  await dropProcedures(knex);
  await knex.schema.dropTable("bldg_owner");
}
