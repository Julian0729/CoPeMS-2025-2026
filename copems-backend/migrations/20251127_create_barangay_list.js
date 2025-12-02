export async function up(knex) {
  const hasTable = await knex.schema.hasTable("barangay_list");

  if (!hasTable) {
    await knex.schema.createTable("barangay_list", function (table) {
      table.increments("barangay_id").primary();
      table.string("barangay_name", 100).notNullable().unique();
      table.timestamps(true, true);
    });
  }
}

export async function down(knex) {
  await knex.schema.dropTable("barangay_list");
}
