export async function up(knex) {
  const hasTable = await knex.schema.hasTable("occupancy_type");

  if (!hasTable) {
    await knex.schema.createTable("occupancy_type", function (table) {
      table.increments("occupancy_type_id").primary();
      table.string("type_name", 50).notNullable().unique();
      table.string("description", 255).nullable();
    });
  }

  await knex("occupancy_type").insert([
    { type_name: "Partial", description: "Partial Application" },
    { type_name: "Complete", description: "Complete Application" },
  ]);
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("occupancy_type");
}
