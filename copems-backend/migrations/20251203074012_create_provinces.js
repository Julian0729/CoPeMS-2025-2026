export async function up(knex) {
  const hasTable = await knex.schema.hasTable("provinces");

  if (!hasTable) {
    await knex.schema.createTable("provinces", function (table) {
      table.increments("province_id").primary();
      table.string("province_name", 100).notNullable().unique();
      table.timestamps(true, true);
    });
  }
}

export async function down(knex) {
  await knex.schema.dropTable("provinces");
}
