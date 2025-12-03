/**
 * @param { import("knex").Knex } knex
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("provinces").del();

  // Insert Bicol Region provinces
  await knex("provinces").insert([
    { province_name: "Albay" },
    { province_name: "Camarines Sur" },
    { province_name: "Camarines Norte" },
    { province_name: "Catanduanes" },
    { province_name: "Masbate" },
    { province_name: "Sorsogon" },
  ]);
}
