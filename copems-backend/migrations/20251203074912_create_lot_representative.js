import {
  createProcedures,
  dropProcedures,
} from "../routes/procedures/lot_representative_procedures.js";

export async function up(knex) {
  const hasTable = await knex.schema.hasTable("lot_representative");

  if (!hasTable) {
    await knex.schema.createTable("lot_representative", function (table) {
      table.increments("lot_rep_id").primary();

      // Foreign key to user_account
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("User_ID")
        .inTable("user_account")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      table.string("last_name", 100).notNullable();
      table.string("first_name", 100).notNullable();
      table.string("middle_initial", 5).nullable();
      table.string("house_no", 50).nullable();
      table.string("street", 200).notNullable();
      table.string("govt_issued_id_no", 50).nullable();
      table.date("date_issued").nullable();
      table.string("place_issued", 100).nullable();
      table.integer("province_id").unsigned().nullable();
      table.integer("barangay_id").unsigned().nullable();
      table.timestamps(true, true);

      // Foreign key constraints
      table
        .foreign("province_id")
        .references("province_id")
        .inTable("provinces")
        .onDelete("SET NULL");
      table
        .foreign("barangay_id")
        .references("barangay_id")
        .inTable("barangay_list")
        .onDelete("SET NULL");

      // Index for faster user queries
      table.index("user_id");
    });
  }

  await createProcedures(knex);
}

export async function down(knex) {
  await dropProcedures(knex);
  await knex.schema.dropTable("lot_representative");
}
