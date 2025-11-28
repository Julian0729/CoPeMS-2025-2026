// Migration for scope_of_work table

export async function up(knex) {
  const hasTable = await knex.schema.hasTable('scope_of_work');
  if (!hasTable) {
    await knex.schema.createTable('scope_of_work', function(table) {
      table.increments('id').primary();
      table.string('name', 100).notNullable().unique();
    });
  }
}

export async function down(knex) {
  await knex.schema.dropTable('scope_of_work');
}
