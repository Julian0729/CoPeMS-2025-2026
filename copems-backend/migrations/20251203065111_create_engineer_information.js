import {
  createProcedures,
  dropProcedures,
} from "../routes/procedures/engineer_information_procedures.js";

export async function up(knex) {
  const tableName = "engineer_information";
  const hasTable = await knex.schema.hasTable(tableName);

  if (!hasTable) {
    await knex.schema.createTable(tableName, function (table) {
      table.increments("engineer_id").primary();

      // Foreign key to user_account
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("User_ID")
        .inTable("user_account")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      table.string("first_name", 100).notNullable();
      table.string("last_name", 100).notNullable();
      table.string("middle_initial", 5).nullable();
      table.string("prc_no", 50).nullable();
      table.date("prc_validity").nullable();
      table.string("ptr_no", 50).nullable();
      table.date("ptr_date_issued").nullable();
      table.string("ptr_issued_at", 100).nullable();
      table.string("tin", 20).nullable();
      table.timestamps(true, true);

      // Index for faster user queries
      table.index("user_id");
    });
  }

  await createProcedures(knex);
}

export async function down(knex) {
  const tableName = "engineer_information";
  await dropProcedures(knex);
  await knex.schema.dropTable(tableName);
}
