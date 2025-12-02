/**
 * @param { import("knex").Knex } knex
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("barangay_list").del();

  // Insert all barangays
  await knex("barangay_list").insert([
    { barangay_name: "Abella" },
    { barangay_name: "Bagumbayan Norte" },
    { barangay_name: "Bagumbayan Sur" },
    { barangay_name: "Balatas" },
    { barangay_name: "Calauag" },
    { barangay_name: "Cararayan" },
    { barangay_name: "Carolina" },
    { barangay_name: "Concepcion Grande" },
    { barangay_name: "Concepcion Pequeña" },
    { barangay_name: "Dayangdang" },
    { barangay_name: "Del Rosario" },
    { barangay_name: "Dinaga" },
    { barangay_name: "Igualdad Interior" },
    { barangay_name: "Lerma" },
    { barangay_name: "Liboton" },
    { barangay_name: "Mabolo" },
    { barangay_name: "Pacol" },
    { barangay_name: "Panicuason" },
    { barangay_name: "Peñafrancia" },
    { barangay_name: "Sabang" },
    { barangay_name: "San Felipe" },
    { barangay_name: "San Francisco" },
    { barangay_name: "San Isidro" },
    { barangay_name: "Santa Cruz" },
    { barangay_name: "Tabuco" },
    { barangay_name: "Tinago" },
  ]);
}
