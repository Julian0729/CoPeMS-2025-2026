// Seed file for scope_of_work table

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("scope_of_work").del();

  // Inserts seed entries
  await knex("scope_of_work").insert([
    { name: "New Construction" },
    { name: "Erection" },
    { name: "Addition" },
    { name: "Alteration" },
    { name: "Renovation" },
    { name: "Conversion" },
    { name: "Repair" },
    { name: "Moving" },
    { name: "Raising" },
    { name: "Accessory Building/Structure" },
    { name: "Legalization of Existing Building" },
    { name: "Other (Specify)" },
  ]);
};
