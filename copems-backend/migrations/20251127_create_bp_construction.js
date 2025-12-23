import {
  createProcedures,
  dropProcedures,
} from "../routes/procedures/bp_construction_procedures.js";

export async function up(knex) {
  const hasTable = await knex.schema.hasTable("bp_construction");

  if (!hasTable) {
    await knex.schema.createTable("bp_construction", function (table) {
      table.increments("bp_construction_id").primary();

      // Foreign key to user_account
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("User_ID")
        .inTable("user_account")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      table.string("barangay", 100).notNullable();
      table.string("blk_no", 50).nullable();
      table.string("street", 100).nullable();
      table.string("tct_no", 50).nullable();
      table.string("current_tax_dec_no", 50).nullable();
      table.string("scope_of_work", 100).nullable();
      table.timestamps(true, true);

      table
        .foreign("barangay")
        .references("barangay_name")
        .inTable("barangay_list")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      // Index for faster user queries
      table.index("user_id");
    });
  }

  await createProcedures(knex);
}

export async function down(knex) {
  await dropProcedures(knex);
  await knex.schema.dropTable("bp_construction");
}
